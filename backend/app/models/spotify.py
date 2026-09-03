from pydantic import BaseModel
from typing import List, Optional


class SpotifyImage(BaseModel):
    url: str
    height: Optional[int] = None
    width: Optional[int] = None


class SpotifyArtist(BaseModel):
    id: str
    name: str
    uri: str
    images: List[SpotifyImage] = []


class SpotifyTrack(BaseModel):
    id: str
    name: str
    uri: str
    duration_ms: int
    artists: List[SpotifyArtist]
    album: dict


class TopArtistsResponse(BaseModel):
    items: List[SpotifyArtist]
    total: int


class TopTracksResponse(BaseModel):
    items: List[SpotifyTrack]
    total: int