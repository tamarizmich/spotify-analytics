from fastapi import APIRouter, HTTPException, Request
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
async def callback(request: Request, code: str):
    try:
        token_data = await get_access_token(code)

        request.session["access_token"] = token_data["access_token"]

        if "refresh_token" in token_data:
            request.session["refresh_token"] = token_data["refresh_token"]

        return {
            "message": "Spotify authentication successful!"
        }

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Spotify authentication failed: {str(e)}",
        )