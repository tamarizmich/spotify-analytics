from fastapi import APIRouter, HTTPException
from fastapi.responses import RedirectResponse

from backend.app.config import SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI
from backend.app.services.spotify import get_access_token


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


@router.get("/callback")
async def callback(code: str):
    try:
        token_data = await get_access_token(code)

        return {
            "message": "Spotify authentication successful!",
            "token_type": token_data.get("token_type"),
            "expires_in": token_data.get("expires_in"),
            "access_token": token_data.get("access_token"),
            "refresh_token": token_data.get("refresh_token"),
        }

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Spotify authentication failed: {str(e)}",
        )