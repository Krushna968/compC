import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Initialize OpenAI client with your API key from environment
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '')

    try:
        # Use new client-based API (v1+)
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": user_message}
            ]
        )
        reply = response.choices[0].message.content.strip()
        return jsonify({"reply": reply})
    except Exception as e:
        return jsonify({"reply": "Oops! Something went wrong.", "error": str(e)}), 500

if __name__ == '__main__':
    # Required for Render
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
