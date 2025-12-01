import os
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Set your Gemini API key
API_KEY = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=API_KEY)

# Store chat history
history = []

SYSTEM_INSTRUCTION = """You are an expert GATE (Graduate Aptitude Test in Engineering) exam tutor and assistant for the 'GATE-prep' application.
Your role is to assist both students and teachers.

For Students:
- Provide clear, concise, and accurate explanations for GATE-related questions (Computer Science, IT, and related fields).
- Help solve problems step-by-step.
- Suggest study resources and strategies.
- Clarify doubts in subjects like Data Structures, Algorithms, Operating Systems, Computer Networks, DBMS, etc.
- Be encouraging and motivational.

For Teachers:
- Assist in creating questions and quizzes.
- Provide suggestions for explaining complex topics to students.

General Rules:
- Keep answers relevant to the GATE syllabus.
- Use formatting (bullet points, code blocks) to make answers readable.
- If a question is outside the scope of GATE or engineering, politely steer the conversation back to studies.
- Be polite, professional, and helpful."""

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/chat', methods=['POST', 'GET', 'OPTIONS'])
def chat():
    if request.method == 'OPTIONS':
        return jsonify({}), 200
    
    if request.method == 'GET':
        return jsonify({"message": "Chat API is running"}), 200

    user_input = request.form.get('user_input')
    if not user_input:
        return jsonify({"error": "No user_input provided"}), 400
    
    try:
        # Constructing contents with history for context
        # We will send the last few messages to maintain context
        # (Simple implementation: just append history to contents if supported, 
        # but for now let's stick to single turn with system instruction to ensure stability first)
        
        response = client.models.generate_content(
            model="gemini-2.5-flash", 
            contents=user_input,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_INSTRUCTION,
                temperature=0.7,
            )
        )
        ai_response = response.text

        # Update history
        history.append({"role": "user", "parts": [user_input]})
        history.append({"role": "model", "parts": [ai_response]})

        return jsonify({"response": ai_response})

    except Exception as e:
        print(f"Error generating response: {e}")
        return jsonify({"response": "Sorry, I encountered an error. Please try again."}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
