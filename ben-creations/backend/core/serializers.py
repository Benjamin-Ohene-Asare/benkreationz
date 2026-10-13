
from rest_framework import serializers

from .models import ContactEnquiry


class ContactEnquirySerializer(serializers.ModelSerializer):
 class Meta:
    model = ContactEnquiry

    fields = [
        "id",
        "name",
        "email",
        "phone",
        "subject",
        "message",
        "created_at",
    ]

    read_only_fields = [
        "id",
        "created_at",
    ]

    def validate_name(self, value):
        value = value.strip()

        if len(value) < 2:
            raise serializers.ValidationError(
                "Please enter your full name."
            )

        return value

    def validate_subject(self, value):
        value = value.strip()

        if len(value) < 3:
            raise serializers.ValidationError(
                "Subject must contain at least 3 characters."
            )

        return value

    def validate_message(self, value):
        value = value.strip()

        if len(value) < 10:
            raise serializers.ValidationError(
                "Message must contain at least 10 characters."
            )

        return value

    def validate_phone(self, value):
        value = value.strip()

        if value and not all(
            character.isdigit() or character in "+ -()"
            for character in value
        ):
            raise serializers.ValidationError(
                "Enter a valid phone number."
            )

        return value
