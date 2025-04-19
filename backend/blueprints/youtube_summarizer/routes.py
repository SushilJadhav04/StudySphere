import os
import re
import tempfile
from flask import Blueprint, request, jsonify
from flask_cors import CORS
from pytube import YouTube
from youtube_transcript_api import YouTubeTranscriptApi
from dotenv import load_dotenv
from faster_whisper import WhisperModel
import google.generativeai as genai
from .utils.text_processor import clean_text
from pydub import AudioSegment
import speech_recognition as sr

# Load environment variables
load_dotenv()
# Configure using environment variable
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))  # Modified
model = genai.GenerativeModel("gemini-1.5-flash")


# Flask Blueprint
youtube_bp = Blueprint('youtube', __name__)
CORS(youtube_bp)


def extract_video_id(url):
    pattern = r'(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})'
    match = re.search(pattern, url)
    return match.group(1) if match else None


def fetch_transcript(video_id):
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=['en'])
        return ' '.join([entry['text'] for entry in transcript])
    except:
        try:
            transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=['hi'])
            return ' '.join([entry['text'] for entry in transcript])
        except Exception as e:
            print(f"Transcript fetch failed: {e}")
            return None


def transcribe_with_whisper(audio_path):
    try:
        model = WhisperModel("base")
        segments, _ = model.transcribe(audio_path)
        return ' '.join([segment.text for segment in segments])
    except Exception as e:
        print(f"Whisper transcription failed: {e}")
        return None


def summarize_text(text, is_transcript=True):
    if not text or not text.strip():
        return "No content available to summarize"

    try:
        prompt = (
            f"Summarize the following YouTube video {'transcript' if is_transcript else 'audio content'} "
            f"in 5-7 key points:\n\n{text}"
        )
        response = model.generate_content(prompt)
        return clean_text(response.text) if response.text else "Empty response from Gemini"
    except Exception as e:
        print(f"Gemini summarization error: {e}")
        return f"Error generating summary: {e}"


@youtube_bp.route('/summarize_youtube', methods=['POST', 'OPTIONS'])
def summarize_youtube():
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'success'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', '*')
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        return response

    try:
        data = request.get_json()
        youtube_url = data.get('url')

        if not youtube_url:
            return jsonify({'error': 'No URL provided'}), 400

        video_id = extract_video_id(youtube_url)
        if not video_id:
            return jsonify({'error': 'Invalid YouTube URL'}), 400

        transcript = fetch_transcript(video_id)

        if transcript:
            summary = summarize_text(transcript, is_transcript=True)
            source = "transcript"
        else:
            try:
                yt = YouTube(youtube_url)
                audio_stream = yt.streams.filter(only_audio=True).first()

                with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as tmp_file:
                    audio_path = tmp_file.name
                    audio_stream.download(filename=audio_path)

                transcription = transcribe_with_whisper(audio_path)
                os.remove(audio_path)

                if not transcription:
                    return jsonify({'error': 'Failed to transcribe audio'}), 500

                summary = summarize_text(transcription, is_transcript=False)
                source = "audio"

            except Exception as e:
                print(f"Audio processing failed: {e}")
                return jsonify({'error': f'Error processing video: {str(e)}'}), 500

        response = jsonify({
            'summary': summary,
            'source': source
        })
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    except Exception as e:
        print(f"Unhandled error: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500
