import os
from dotenv import load_dotenv

load_dotenv()

SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
SPOTIFY_REDIRECT_URI = os.getenv("SPOTIFY_REDIRECT_URI")

if not SPOTIFY_CLIENT_ID:
    raise ValueError("SPOTIFY_CLIENT_ID is not set in the environment variables.")

if not SPOTIFY_CLIENT_SECRET:
    raise ValueError("SPOTIFY_CLIENT_SECRET is not set in the environment variables.")

if not SPOTIFY_REDIRECT_URI:
    raise ValueError("SPOTIFY_REDIRECT_URI is not set in the environment variables.")