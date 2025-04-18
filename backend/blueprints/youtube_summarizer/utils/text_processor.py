import re

def clean_text(text):
    # ✅ Normalize all whitespace (remove \r and excessive tabs)
    text = re.sub(r'[\r\t]', '', text)

    # ✅ Merge broken lines caused by newline after every word/sentence
    text = re.sub(r'(?<!\n)\n(?!\n)', ' ', text)  # remove single newlines not part of paragraph breaks

    # ✅ Fix common abbreviation and e.g. line breaks
    text = re.sub(r'(?<=e)\.\s*g\.', 'e.g.', text)
    text = re.sub(r'(?<=i)\.\s*e\.', 'i.e.', text)

    # ✅ Fix numbered/bulleted list indentation
    text = re.sub(r'(\d+)\.\s*', r'\n\1. ', text)

    # ✅ Remove excessive asterisks but keep content
    text = re.sub(r'\*+', '', text)

    # ✅ Bold headings (with colon) on a new line
    text = re.sub(r'(?<!\n)([A-Z][\w\s]+:)', r'\n\1', text)

    # ✅ Convert `-` or `•` lists into consistent bullet points
    text = re.sub(r'[-•]\s+', r'\n• ', text)

    # ✅ Ensure punctuation spacing and newlines
    text = re.sub(r'(\w)([.?!])\s*', r'\1\2 ', text)

    # ✅ Replace multiple newlines with max two
    text = re.sub(r'\n{2,}', '\n\n', text)

    # ✅ Final trim
    return text.strip()
