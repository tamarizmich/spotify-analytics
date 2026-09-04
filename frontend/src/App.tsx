import { useEffect, useState } from 'react'
import { getSpotifyAnalysis } from './services/spotify'

function App() {
  const [analysis, setAnalysis] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const loginWithSpotify = () => {
    window.location.href = 'http://127.0.0.1:8000/auth/login'
  }

  useEffect(() => {
    getSpotifyAnalysis()
      .then(setAnalysis)
      .catch((error) => {
        setError(error.message)
      })
  }, [])

  return (
    <div>
      <h1>K-Pop Analytics</h1>
      <p>Your Spotify music insights</p>

      {!analysis && (
        <button onClick={loginWithSpotify}>
          Connect with Spotify
        </button>
      )}

      {error && <p>Error: {error}</p>}

      {analysis && (
        <div>
          <h2>{analysis.top_artist.name}</h2>

          <p>
            Short vs Medium:{' '}
            {analysis.short_vs_medium.overlap_percentage}%
          </p>

          <p>
            Short vs Long:{' '}
            {analysis.short_vs_long.overlap_percentage}%
          </p>
        </div>
      )}
    </div>
  )
}

export default App