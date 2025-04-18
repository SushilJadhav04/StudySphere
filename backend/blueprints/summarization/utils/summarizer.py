import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()
# Configure using environment variable
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))  # Modified
model = genai.GenerativeModel("gemini-1.5-flash")

# Load the Gemini Pro model
model = genai.GenerativeModel('gemini-1.5-flash')

def generate_summary(text, word_limit=None):
    if not text.strip():
        return "No valid text for summarization."

    try:
        # Include the word limit in the prompt if provided
        if word_limit:
            prompt = (
                f"Summarize the following text in approximately {word_limit} words. "
                f"Highlight key points, maintain clarity, and do not add extra content:\n\n{text}"
            )
        else:
            prompt = (
                f"Summarize the following text, highlighting the key points without altering the original content:\n\n{text}"
            )

        response = model.generate_content(prompt)
        summary = response.text

        # Ensure the summary is formatted nicely with bullet points
        if not summary.startswith("-"):
            summary = "\n".join([f"- {line.strip()}" for line in summary.split('\n') if line.strip()])

        return f" Summary \n\n{summary}"
    except Exception as e:
        return f" Summarization Error: {str(e)}"
