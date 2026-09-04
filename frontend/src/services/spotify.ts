const API_URL = 'http://127.0.0.1:8000'

export async function getSpotifyAnalysis() {
  const response = await fetch(
    `${API_URL}/spotify/analysis`,
    {
      credentials: 'include',
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch Spotify analysis')
  }

  return response.json()
}