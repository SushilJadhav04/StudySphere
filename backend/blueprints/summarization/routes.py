from flask import Blueprint, request, jsonify, render_template
import traceback
import google.generativeai as genai
from flask_cors import CORS
from .utils.summarizer import generate_summary  # Smart Summarization
from .utils.text_processor import clean_text 
from dotenv import load_dotenv
import os


load_dotenv()
# Configure using environment variable
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))  # Modified
model = genai.GenerativeModel("gemini-1.5-flash")

summarization_bp = Blueprint('summarization', __name__, template_folder='templates', static_folder='static')

CORS(summarization_bp) 

@summarization_bp.route("/", methods=["GET"])
def summarization_ui():
    return render_template("summarization.html")

@summarization_bp.route("/process-text", methods=["POST"])
def process_text():
    try:
        data = request.get_json()
        text = data.get("text", "").strip()
        if not text:
            return jsonify({"error": "No text provided"}), 400

        word_limit = data.get("word_limit")  # Accepts None or a number
        if isinstance(word_limit, str) and word_limit.isdigit():
            word_limit = int(word_limit)
        elif not isinstance(word_limit, int):
            word_limit = None  # default to auto if invalid

        cleaned_text = clean_text(text)
        summary = generate_summary(cleaned_text, word_limit=word_limit)
        
        return jsonify({
            "summary": summary,
        }), 200
    except Exception as e:
        print(f"Error: {str(e)}")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
