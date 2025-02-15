import os
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}})

# Set your Gemini API key
API_KEY = "AIzaSyDDuXicWzcH0kx0C0-ID52bPcaDP95rQDk"
genai.configure(api_key=API_KEY)

# Define Gemini model with configuration
generation_config = {
    "temperature": 1.05,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-pro",
    generation_config=generation_config,
    system_instruction="You are an expert instructor helping students with GATE exam preparation. You will answer their questions, provide explanations, and guide them in understanding concepts."
)

# Store chat history
history = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.form['user_input']
    
    # Start chat session with history
    chat_session = model.start_chat(history=history)
    
    # Get AI response
    response = chat_session.send_message(user_input)
    ai_response = response.text

    # Update history
    history.append({"role": "user", "parts": [user_input]})
    history.append({"role": "model", "parts": [ai_response]})

    return jsonify({"response": ai_response})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
