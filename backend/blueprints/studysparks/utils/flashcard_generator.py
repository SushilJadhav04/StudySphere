import re
import google.generativeai as genai

# Configure the Gemini API
GOOGLE_API_KEY = "AIzaSyD-wQdLCoXGBL0BUcQmaeg8UOexw_Z_h1s"  # Replace with your actual API key
genai.configure(api_key=GOOGLE_API_KEY)

# Load the Gemini Pro model
model = genai.GenerativeModel('gemini-1.5-flash')

def generate_flashcards(text):
    # Extract key sentences using regex
    sentences = re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s', text)
    
    flashcards = []
    for i, sentence in enumerate(sentences[:5]):  # Limit to the first 5 sentences
        # Generate a question from the sentence
        prompt = f"Generate a simple question based on the following sentence:\n{sentence}"
        response = model.generate_content(prompt)
        question = response.text.strip()
        
        flashcards.append({
            "id": i + 1,
            "question": question,
            "answer": sentence
        })

    return flashcards
