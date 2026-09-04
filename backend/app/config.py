import os
from dotenv import load_dotenv

load_dotenv()

SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
SPOTIFY_REDIRECT_URI = os.getenv("SPOTIFY_REDIRECT_URI")
SESSION_SECRET_KEY = os.getenv("SESSION_SECRET_KEY")
FRONTEND_URL = os.getenv("FRONTEND_URL")

if not SPOTIFY_CLIENT_ID:
    raise ValueError("SPOTIFY_CLIENT_ID is not set in the environment variables.")

if not SPOTIFY_CLIENT_SECRET:
    raise ValueError("SPOTIFY_CLIENT_SECRET is not set in the environment variables.")

if not SPOTIFY_REDIRECT_URI:
    raise ValueError("SPOTIFY_REDIRECT_URI is not set in the environment variables.")

if not SESSION_SECRET_KEY:
    raise ValueError("SESSION_SECRET_KEY is not set in the environment variables.")

if not FRONTEND_URL:
    raise ValueError("FRONTEND_URL is not set in the environment variables.")