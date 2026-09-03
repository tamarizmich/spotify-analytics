from fastapi import APIRouter, HTTPException, Request

from backend.app.models.spotify import (
    TopArtistsResponse,
    TopTracksResponse,
)

from backend.app.services.spotify import (
    get_current_user,
    get_top_artists,
    get_top_tracks,
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


@router.get("/top-artists", response_model=TopArtistsResponse)
async def top_artists(
    request: Request,
    time_range: str = "medium_term",
):
    access_token = request.session.get("access_token")

    if not access_token:
        raise HTTPException(
            status_code=401,
            detail="Not authenticated with Spotify",
        )

    try:
        artists = await get_top_artists(
            access_token,
            time_range=time_range,
            )

        return {
            "items": [
                {
                    "id": artist["id"],
                    "name": artist["name"],
                    "uri": artist["uri"],
                    "images": artist.get("images", []),
                }
                for artist in artists.get("items", [])
            ],
            "total": artists.get("total", 0),
        }

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Unable to retrieve top artists: {str(e)}",
        )

@router.get("/top-tracks", response_model=TopTracksResponse)
async def top_tracks(
    request: Request,
    time_range: str = "medium_term",
):
    access_token = request.session.get("access_token")

    if not access_token:
        raise HTTPException(
            status_code=401,
            detail="Not authenticated with Spotify",
        )

    try:
        tracks = await get_top_tracks(
            access_token,
            time_range=time_range,
        )

        return {
            "items": [
                {
                    "id": track["id"],
                    "name": track["name"],
                    "uri": track["uri"],
                    "duration_ms": track["duration_ms"],
                    "artists": [
                        {
                            "id": artist["id"],
                            "name": artist["name"],
                            "uri": artist["uri"],
                            "images": artist.get("images", []),
                        }
                        for artist in track.get("artists", [])
                    ],
                    "album": track["album"],
                }
                for track in tracks.get("items", [])
            ],
            "total": tracks.get("total", 0),
        }

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Unable to retrieve top tracks: {str(e)}",
        )