from fastapi import APIRouter, HTTPException, Request

from backend.app.services.spotify import (
    get_current_user,
    get_top_artists,
)


router = APIRouter(prefix="/spotify", tags=["Spotify"])


@router.get("/me")
async def get_me(request: Request):
    access_token = request.session.get("access_token")

    if not access_token:
        raise HTTPException(
            status_code=401,
            detail="Not authenticated with Spotify",
        )

    try:
        user = await get_current_user(access_token)

        return {
            "id": user.get("id"),
            "display_name": user.get("display_name"),
            "email": user.get("email"),
            "country": user.get("country"),
            "product": user.get("product"),
            "images": user.get("images"),
        }

    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Unable to retrieve Spotify profile",
        )


@router.get("/top-artists")
async def top_artists(request: Request):
    access_token = request.session.get("access_token")

    if not access_token:
        raise HTTPException(
            status_code=401,
            detail="Not authenticated with Spotify",
        )

    try:
        artists = await get_top_artists(access_token)

        return artists

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Unable to retrieve top artists: {str(e)}",
        )