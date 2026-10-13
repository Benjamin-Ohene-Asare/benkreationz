
import logging

from rest_framework import generics, permissions, status
from rest_framework.decorators import (
    api_view,
    permission_classes,
    throttle_classes,
)
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

from .models import ContactEnquiry
from .serializers import ContactEnquirySerializer
from .services.bms_sms import send_bms_sms
from .services.email_notification import send_enquiry_email
from .services.gemini_ai import generate_ai_reply

logger = logging.getLogger(__name__)


# ==========================================
# HEALTH CHECK
# ==========================================

@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def health_check(request):
    return Response({
        "status": "success",
        "message": "BenKreations API is running",
    })


# ==========================================
# CONTACT ENQUIRIES
# ==========================================

class ContactEnquiryThrottle(AnonRateThrottle):
    scope = "contact_enquiry"
    rate = "5/hour"


class ContactEnquiryCreateView(generics.CreateAPIView):
    queryset = ContactEnquiry.objects.all()
    serializer_class = ContactEnquirySerializer

    permission_classes = [permissions.AllowAny]
    throttle_classes = [ContactEnquiryThrottle]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Save enquiry before attempting notifications.
        enquiry = serializer.save()

        # BMS SMS NOTIFICATION
        sms_message = (
            "New BenKreations enquiry!\n"
            f"Name: {enquiry.name}\n"
            f"Service: {enquiry.subject}\n"
            f"Enquiry ID: {enquiry.id}\n"
            "Check your email for full details."
        )

        try:
            sms_accepted = send_bms_sms(sms_message)
        except Exception:
            logger.exception(
                "Unexpected SMS error for enquiry %s",
                enquiry.id,
            )
            sms_accepted = False

        if sms_accepted:
            enquiry.sms_notification_sent = True
            enquiry.save(update_fields=["sms_notification_sent"])

        # GMAIL EMAIL NOTIFICATION
        try:
            email_sent = send_enquiry_email(enquiry)
        except Exception:
            logger.exception(
                "Unexpected email error for enquiry %s",
                enquiry.id,
            )
            email_sent = False

        if email_sent:
            enquiry.email_notification_sent = True
            enquiry.save(update_fields=["email_notification_sent"])

        # RESPONSE TO CUSTOMER
        return Response(
            {
                "success": True,
                "message": (
                    "Thank you for contacting BenKreations. "
                    "Your enquiry has been received successfully."
                ),
            },
            status=status.HTTP_201_CREATED,
        )


# ==========================================
# GEMINI AI ASSISTANT
# ==========================================

class AIChatThrottle(AnonRateThrottle):
    scope = "ai_chat"
    rate = "10/hour"


@api_view(["POST"])
@permission_classes([permissions.AllowAny])
@throttle_classes([AIChatThrottle])
def ai_chat(request):
    message = request.data.get("message")
    history = request.data.get("history", [])

    # Validate visitor message.
    if not isinstance(message, str) or not message.strip():
        return Response(
            {"error": "Please enter a message."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    message = message.strip()

    if len(message) > 2000:
        return Response(
            {"error": "Message must not exceed 2000 characters."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Validate conversation history.
    if not isinstance(history, list) or len(history) > 10:
        return Response(
            {"error": "Invalid conversation history."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    clean_history = []

    for item in history:
        if not isinstance(item, dict):
            return Response(
                {"error": "Invalid conversation history."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        role = item.get("role")
        content = item.get("content")

        if (
            role not in ("user", "assistant")
            or not isinstance(content, str)
            or not content.strip()
            or len(content) > 2000
        ):
            return Response(
                {"error": "Invalid conversation history."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        clean_history.append({
            "role": role,
            "content": content.strip(),
        })

    # Generate Gemini response.
    try:
        reply = generate_ai_reply(
            message=message,
            history=clean_history,
        )

        return Response(
            {"reply": reply},
            status=status.HTTP_200_OK,
        )

    except Exception:
        logger.exception("AI chat endpoint failed.")

        return Response(
            {
                "error": (
                    "The AI Assistant is temporarily unavailable. "
                    "Please try again later."
                )
            },
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )
