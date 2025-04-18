import re

def clean_text(text):
    # ✅ Remove excessive asterisks but keep bold words
    text = re.sub(r'\*+', '', text)  

    # ✅ Ensure bold headings appear on a new line
    text = re.sub(r'(\b[A-Z][a-zA-Z\s]+:)', r'\n\1', text)  

    # ✅ Convert `-` lists into proper bullet points
    text = re.sub(r'-\s+', '\n• ', text)  

    # ✅ Ensure proper sentence structure with spacing
    text = re.sub(r'(\w)([?.!])', r'\1\2\n', text)  

    # ✅ Replace multiple newlines with a single one
    text = re.sub(r'\n+', '\n', text).strip()

    return text
