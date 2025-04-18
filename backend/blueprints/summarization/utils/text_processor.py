import re

def clean_text(text):
    text = text.replace("\n", " ")
    text = re.sub(r'\s+', ' ', text).strip()
    return text
