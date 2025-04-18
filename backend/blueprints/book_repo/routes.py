import requests
from bs4 import BeautifulSoup
from flask import Blueprint, request, jsonify
from flask_cors import cross_origin  # Allows frontend access
from dotenv import load_dotenv
import os

load_dotenv()

book_repo_bp = Blueprint("book_repo", __name__)

# API Endpoints
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY is not set in the environment variables.")
GOOGLE_API_URL = "https://www.googleapis.com/books/v1/volumes?q="
OPEN_LIBRARY_API_URL = "https://openlibrary.org/search.json?title="
LIBGEN_SEARCH_URL = "http://libgen.rs/search.php?req={}&open=0&res=25&view=simple&phrase=1&column=def"
LIBGEN_DOWNLOAD_URL = "http://library.lol/main/{}"


@book_repo_bp.route("/search", methods=["GET"])
@cross_origin()
def search_books():
    query = request.args.get("query")
    if not query:
        return jsonify({"error": "No query provided"}), 400

    try:
        books = []

        # 🔹 Google Books API
        google_response = requests.get(f"{GOOGLE_API_URL}{query}&key={GOOGLE_API_KEY}")
        google_data = google_response.json()
        
        if "items" in google_data:
            for book in google_data["items"]:
                title = book["volumeInfo"].get("title", "No Title")
                authors = ", ".join(book["volumeInfo"].get("authors", ["Unknown Author"]))
                thumbnail = book["volumeInfo"].get("imageLinks", {}).get("thumbnail", "https://via.placeholder.com/150")
                preview_link = book["volumeInfo"].get("previewLink", "#")

                books.append({
                    "title": title,
                    "authors": authors,
                    "thumbnail": thumbnail,
                    "preview_link": preview_link,
                    "download_link": None,  # This will be updated from LibGen
                })

        # 🔹 Open Library API
        open_library_response = requests.get(f"{OPEN_LIBRARY_API_URL}{query}")
        open_library_data = open_library_response.json()

        if "docs" in open_library_data:
            for book in open_library_data["docs"][:10]:  # Limit results
                title = book.get("title", "No Title")
                authors = ", ".join(book.get("author_name", ["Unknown Author"]))
                preview_link = f"https://openlibrary.org{book['key']}" if "key" in book else "#"

                books.append({
                    "title": title,
                    "authors": authors,
                    "thumbnail": "https://via.placeholder.com/150",
                    "preview_link": preview_link,
                    "download_link": None,
                })

        # 🔹 LibGen for Free Downloads
        libgen_response = requests.get(LIBGEN_SEARCH_URL.format(query))
        soup = BeautifulSoup(libgen_response.text, "html.parser")

        download_links = []
        for row in soup.select("table tr:nth-child(n+2)"):  # Skip header row
            cols = row.find_all("td")
            if len(cols) > 9:
                title = cols[2].get_text(strip=True)
                md5_hash = cols[9].a["href"].split("=")[-1]
                download_link = LIBGEN_DOWNLOAD_URL.format(md5_hash)

                download_links.append({"title": title, "link": download_link})

        # 🔹 Merge LibGen Download Links into Books List
        for book in books:
            match = next((dl["link"] for dl in download_links if dl["title"].lower() == book["title"].lower()), None)
            if match:
                book["download_link"] = match

        return jsonify({"books": books})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
