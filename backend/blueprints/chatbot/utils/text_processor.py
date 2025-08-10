import markdown

def format_text(text):
    """
    Converts Markdown from AI response to HTML for rendering in frontend.
    """
    return markdown.markdown(text, extensions=["fenced_code", "tables"])
