from flask import Blueprint, request, jsonify, render_template
import google.generativeai as genai
import pdfplumber  
import os
from .utils.text_processor import format_text  
from dotenv import load_dotenv

load_dotenv()

chatbot_bp = Blueprint('chatbot', __name__, template_folder='templates', static_folder='static')

# Configure using environment variable
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))  # Modified
model = genai.GenerativeModel("gemini-1.5-flash")

@chatbot_bp.route("/", methods=["GET"])
def chatbot_ui():
    return render_template("chatbot.html")

@chatbot_bp.route("/ask_gemini", methods=["POST"])
def ask_gemini():
    try:
        data = request.get_json()
        user_input = data.get("query")

        if not user_input:
            return jsonify({"error": "No query provided"}), 400
        
        formatted_query = (
            f"{user_input}\n\n"
            "Please respond in a well-structured format using:\n"
            "- **Bold headings** for important points.\n"
            "- **Numbered lists** or **bullet points** where appropriate.\n"
            "- Proper spacing and paragraph breaks for readability.\n"
            "Ensure the response is clear and organized."
        )
            
        response = model.generate_content(user_input)

        formatted_html = format_text(response.text)

        return jsonify({"response": formatted_html})

    except Exception as e:
        print("Error:", str(e))  
        return jsonify({"error": str(e)}), 500

# ✅ New route: Handle PDF uploads and extracted text
@chatbot_bp.route("/upload_pdf", methods=["POST"])
def upload_pdf():
    try:
        if "pdf" not in request.files:
            print("No file found in request!")  
            return jsonify({"error": "No file provided"}), 400

        file = request.files["pdf"]
        print(f"Received file: {file.filename}")  # ✅ Debugging log

        # Read PDF content using pdfplumber
        text = ""
        with pdfplumber.open(file) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"

        if not text.strip():
            print("PDF has no extractable text!")  # ✅ Debugging log
            return jsonify({"error": "No extractable text found in PDF."}), 400

        return jsonify({"text": text.strip()})

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": "Failed to process PDF"}), 500