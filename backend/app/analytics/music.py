from typing import List, Dict, Any


def get_top_artist(artists: List[Dict[str, Any]]) -> Dict[str, Any] | None:
    """
    Returns the artist ranked #1.
    """
    if not artists:
        return None

    return artists[0]


def get_artist_names(artists: List[Dict[str, Any]]) -> List[str]:
    """
    Returns a list with only the artist names.
    """
    return [artist["name"] for artist in artists]


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