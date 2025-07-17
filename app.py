import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI

app = Flask(__name__)
CORS(app)

# New client setup
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '')

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": user_message}]
        )
        reply = response.choices[0].message.content.strip()
        return jsonify({"reply": reply})

    except Exception as e:
        return jsonify({"reply": "Oops! Error occurred.", "error": str(e)}), 500

# Required for Render to work
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
