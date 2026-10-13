
import logging

import requests
from django.conf import settings

logger = logging.getLogger(__name__)


def send_bms_sms(message):
    api_key = settings.BMS_API_KEY
    sender_id = settings.BMS_SENDER_ID
    phone = settings.BMS_NOTIFICATION_PHONE

    if not all([api_key, sender_id, phone]):
        logger.error("BMS SMS configuration is incomplete.")
        return False

    payload = {
        "recipient": [phone],
        "sender": sender_id,
        "message": message,
        "is_schedule": False,
        "schedule_date": "",
    }

    try:
        response = requests.post(
            settings.BMS_API_URL,
            params={"key": api_key},
            json=payload,
            timeout=15,
        )
        response.raise_for_status()

        result = response.json()

        success = (
            result.get("status") == "success"
            and str(result.get("code")) == "2000"
        )

        if not success:
            logger.warning(
                "BMS rejected SMS request. Code: %s",
                result.get("code"),
            )

        return success

    except (requests.RequestException, ValueError):
        logger.exception("BMS SMS request failed.")
        return False
