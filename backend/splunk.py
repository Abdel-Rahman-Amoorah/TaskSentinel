import json
import time

import requests


def send_event_to_splunk(event_data):
    print(event_data)
    """Send an event to Splunk using the HTTP Event Collector (HEC)"""

    # Splunk HEC configuration
    HEC_URL = "https://your-splunk-instance/services/collector" # Replace with your actual Splunk HEC URL
    HEC_TOKEN = "Put your HEC token here"  # Replace with your actual HEC token
    VERIFY_SSL = False 

    headers = {
        "Authorization": f"Splunk {HEC_TOKEN}",
        "Content-Type": "application/json"
    }


    payload = {
        "event": event_data,
        "sourcetype": "_json"
    }
    try:
        response = requests.post(
            HEC_URL,
            headers=headers,
            data=json.dumps(payload),
            verify=VERIFY_SSL
        )

        # Check the response
        if response.status_code == 200:
            print("Event successfully sent to Splunk!")
            print("Response:", response.json())
        else:
            print(f"Failed to send event. Status code: {response.status_code}")
            print("Response:", response.text)

    except requests.exceptions.RequestException as e:
        print(f"Error connecting to Splunk HEC: {e}")
