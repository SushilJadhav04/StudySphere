import google.generativeai as genai

GOOGLE_API_KEY = "AIzaSyD-wQdLCoXGBL0BUcQmaeg8UOexw_Z_h1s"  # Replace with actual key
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

def generate_summary(text):
    if not text.strip():
        return "No valid text for summarization."

    try:
        prompt = f"Summarize the following text with clear key points:\n{text}"
        response = model.generate_content(prompt)

        summary = response.text.strip()

        if not summary:
            return "No summary generated."

        return summary
    except Exception as e:
        print(f"Summarization Error: {str(e)}")
        return "Summarization failed."
