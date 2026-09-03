from fastapi import APIRouter
from fastapi.responses import RedirectResponse

from backend.app.config import SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI


router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.get("/login")
async def login():
    scopes = [
        "user-read-private",
        "user-read-email",
        "user-top-read",
        "user-read-recently-played",
    ]

    authorization_url = (
        "https://accounts.spotify.com/authorize"
        f"?client_id={SPOTIFY_CLIENT_ID}"
        "&response_type=code"
        f"&redirect_uri={SPOTIFY_REDIRECT_URI}"
        f"&scope={' '.join(scopes)}"
    )

    return RedirectResponse(url=authorization_url)