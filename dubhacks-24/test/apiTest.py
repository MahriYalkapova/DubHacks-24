import requests
import unittest

class TestAPI(unittest.TestCase):
    API_URL = "https://im1suu.execute-api.us-east-1.amazonaws.com/dev/storePreferences"
    API_key = "eyEWnqGVAd7DhKypE8nHj1Y5sSZSF8bo3fwBs9OS"

    def test_post_request(self):
        headers = {
            "x-api-key": self.API_key,
            "Content-Type": "application/json"
        }
        data = {
            "user_id": "12345",
            "topic": "AI",
            "resource_type": "video",
            "time_commitment": 7
        }
        response = requests.post(self.API_URL, json=data, headers=headers)
        self.assertEqual(response.status_code, 200)
        self.assertIn("Preferences saved", response.json()["message"])

    def test_get_request(self):
        headers = {
            "x-api-key": self.API_key
        }
        response = requests.get(self.API_URL, headers=headers)
        self.assertEqual(response.status_code, 200)
        # Further checks for response content

if __name__ == '__main__':
    unittest.main()
