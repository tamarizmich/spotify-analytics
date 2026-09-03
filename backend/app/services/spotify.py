import base64

import httpx

from backend.app.config import (
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REDIRECT_URI,
)


SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
SPOTIFY_API_URL = "https://api.spotify.com/v1"


async def get_access_token(code: str) -> dict:
    credentials = f"{SPOTIFY_CLIENT_ID}:{SPOTIFY_CLIENT_SECRET}"

    encoded_credentials = base64.b64encode(
        credentials.encode()
    ).decode()

    headers = {
        "Authorization": f"Basic {encoded_credentials}",
        "Content-Type": "application/x-www-form-urlencoded",
    }

    data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": SPOTIFY_REDIRECT_URI,
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(
            SPOTIFY_TOKEN_URL,
            headers=headers,
            data=data,
        )

    response.raise_for_status()

    return response.json()


async def get_current_user(access_token: str) -> dict:
    headers = {
        "Authorization": f"Bearer {access_token}",
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{SPOTIFY_API_URL}/me",
            headers=headers,
        )

    response.raise_for_status()

    return response.json()

async def get_top_artists(
    access_token: str,
    time_range: str = "medium_term",
    limit: int = 20,
) -> dict:
    headers = {
        "Authorization": f"Bearer {access_token}",
    }

    params = {
        "time_range": time_range,
        "limit": limit,
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{SPOTIFY_API_URL}/me/top/artists",
            headers=headers,
            params=params,
        )

    response.raise_for_status()

    return response.json()