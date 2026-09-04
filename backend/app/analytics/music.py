from typing import List, Dict, Any


def get_top_artist(artists: List[Dict[str, Any]]) -> Dict[str, Any] | None:
    """
    Returns the artist ranked #1.
    """
    if not artists:
        return None

    artist = artists[0]

    return {
        "id": artist["id"],
        "name": artist["name"],
        "image": artist["images"][0]["url"] if artist.get("images") else None,
    }


def get_artist_names(artists: List[Dict[str, Any]]) -> List[str]:
    """
    Returns a list with only the artist names.
    """
    return [artist["name"] for artist in artists]

def get_artist_roster(
    artists: List[Dict[str, Any]]
) -> List[Dict[str, Any]]:
    """
    Returns the information needed for the class roster.
    """

    return [
        {
            "id": artist["id"],
            "name": artist["name"],
            "uri": artist["uri"],
            "images": artist.get("images", []),
        }
        for artist in artists
    ]

def calculate_artist_overlap(
    first_period: List[Dict[str, Any]],
    second_period: List[Dict[str, Any]],
) -> Dict[str, Any]:
    """
    Compares two artist lists and calculates their overlap.
    """

    first_ids = {artist["id"] for artist in first_period}
    second_ids = {artist["id"] for artist in second_period}

    common_ids = first_ids.intersection(second_ids)

    return {
        "common_artists": len(common_ids),
        "first_period_total": len(first_ids),
        "second_period_total": len(second_ids),
        "overlap_percentage": (
            round((len(common_ids) / len(first_ids)) * 100, 2)
            if first_ids
            else 0
        ),
    }


def calculate_rank_movement(
    first_period: List[Dict[str, Any]],
    second_period: List[Dict[str, Any]],
) -> List[Dict[str, Any]]:
    """
    Compares artist rankings between two periods.
    """

    first_ranks = {
        artist["id"]: index + 1
        for index, artist in enumerate(first_period)
    }

    second_ranks = {
        artist["id"]: index + 1
        for index, artist in enumerate(second_period)
    }

    artists = []

    for artist in first_period:
        artist_id = artist["id"]

        if artist_id not in second_ranks:
            continue

        first_rank = first_ranks[artist_id]
        second_rank = second_ranks[artist_id]

        artists.append(
            {
                "id": artist_id,
                "name": artist["name"],
                "image": (
                    artist["images"][0]["url"]
                    if artist.get("images")
                    else None
                ),
                "first_rank": first_rank,
                "second_rank": second_rank,
                "change": first_rank - second_rank,
            }
        )

    artists.sort(
        key=lambda artist: artist["second_rank"]
    )

    return artists

def summarize_rank_changes(
    first_period: List[Dict[str, Any]],
    second_period: List[Dict[str, Any]],
) -> Dict[str, Any]:
    """
    Summarizes artist movements between two periods.
    """

    first_ids = {artist["id"] for artist in first_period}
    second_ids = {artist["id"] for artist in second_period}

    movements = calculate_rank_movement(
        first_period,
        second_period,
    )

    rising = [
        artist
        for artist in movements
        if artist["change"] > 0
    ]

    falling = [
        artist
        for artist in movements
        if artist["change"] < 0
    ]

    stable = [
        artist
        for artist in movements
        if artist["change"] == 0
    ]

    new_artists = [
        {
            "id": artist["id"],
            "name": artist["name"],
            "rank": index + 1,
        }
        for index, artist in enumerate(second_period)
        if artist["id"] not in first_ids
    ]

    dropped_artists = [
        {
            "id": artist["id"],
            "name": artist["name"],
            "rank": index + 1,
        }
        for index, artist in enumerate(first_period)
        if artist["id"] not in second_ids
    ]

    return {
        "rising": rising,
        "falling": falling,
        "stable": stable,
        "new_artists": new_artists,
        "dropped_artists": dropped_artists,
    }