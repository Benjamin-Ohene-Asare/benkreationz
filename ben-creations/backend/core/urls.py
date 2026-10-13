
from django.urls import path

from .views import (
    health_check,
    ContactEnquiryCreateView,
    ai_chat,
)

urlpatterns = [
    path("health/", health_check, name="health-check"),

    path(
        "contact/",
        ContactEnquiryCreateView.as_view(),
        name="contact-enquiry",
    ),

    path(
        "ai/chat/",
        ai_chat,
        name="ai-chat",
    ),
]
