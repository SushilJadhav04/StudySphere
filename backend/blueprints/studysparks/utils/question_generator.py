import google.generativeai as genai

GOOGLE_API_KEY = "AIzaSyD-wQdLCoXGBL0BUcQmaeg8UOexw_Z_h1s"
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

def generate_expected_questions(text):
    try:
        prompt = (
            f"Generate a list of important questions from the following text:\n{text}"
        )

        response = model.generate_content(prompt)

        questions = response.text.split("\n")
        questions = [q.strip().replace("*", "") for q in questions if q.strip()]

        if not questions:
            return ["No questions generated."]

        return questions

    except Exception as e:
        print(f"Question Generation Error: {str(e)}")
        return ["Question generation failed."]
