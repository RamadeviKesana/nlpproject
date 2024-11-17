import requests

# URL of the Flask endpoint
url = "http://127.0.0.1:5000/generate-response"

# Data to send in the POST request
data = {"review_text": "The room was clean, but the service was slow."}

# Send a POST request with JSON data
response = requests.post(url, json=data)

# Print the JSON response from the server
print("Response from API:", response.json())
