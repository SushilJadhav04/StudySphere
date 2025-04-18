from flask import Blueprint, request, jsonify, render_template
import os
import traceback
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS
from .utils.text_processor import clean_text
from .utils.summarizer import generate_summary  # Smart Summarization
from .utils.flashcard_generator import generate_flashcards
from .utils.question_generator import generate_expected_questions 
from dotenv import load_dotenv

load_dotenv()

# Configure using environment variable
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))  # Modified
model = genai.GenerativeModel("gemini-1.5-flash")



studysparks_bp = Blueprint('studysparks', __name__, template_folder='templates', static_folder='static')

@studysparks_bp.route("/", methods=["GET"])
def studysparks_ui():
    return render_template("studysparks.html")

@studysparks_bp.route("/process-text", methods=["POST"])
def process_text():
    try:
        data = request.get_json()
        text = data.get("text", "").strip()
        if not text:
            return jsonify({"error": "No text provided"}), 400

        cleaned_text = clean_text(text)
        summary = generate_summary(cleaned_text)
        flashcards = generate_flashcards(cleaned_text)
        expected_questions = generate_expected_questions(cleaned_text)  # Generate questions

        # Debugging Print Statements
        print("Generated Summary:\n", summary)
        print("Generated Flashcards:\n", flashcards)
        print("Generated Questions:\n", expected_questions)

        return jsonify({
            "summary": summary,
            "flashcards": flashcards,
            "expected_questions": expected_questions  # Return questions
        }), 200
    except Exception as e:
        print(f"Error: {str(e)}")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
