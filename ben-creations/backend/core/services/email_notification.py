
import logging

from django.conf import settings
from django.core.mail import send_mail

logger = logging.getLogger(__name__)


def send_enquiry_email(enquiry):
    recipient = settings.CONTACT_NOTIFICATION_EMAIL

    if not recipient:
        logger.error("Contact notification email is not configured.")
        return False

    subject = f"New Ben Creations Enquiry #{enquiry.id}"

    message = (
        "You have received a new enquiry from your Ben Creations website.\n\n"
        f"Enquiry ID: {enquiry.id}\n"
        f"Name: {enquiry.name}\n"
        f"Email: {enquiry.email}\n"
        f"Phone: {enquiry.phone or 'Not provided'}\n"
        f"Service: {enquiry.subject}\n\n"
        "CUSTOMER MESSAGE\n"
        "------------------------------\n"
        f"{enquiry.message}\n\n"
        "This enquiry has also been saved in your database."
    )

    try:
        sent_count = send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[recipient],
            fail_silently=False,
        )

        return sent_count == 1

    except Exception:
        logger.exception(
            "Email notification failed for enquiry %s",
            enquiry.id,
        )
        return False
