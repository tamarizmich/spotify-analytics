import { useEffect, useState } from 'react'
import Dashboard from './components/Dashboard'
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

  if (analysis) {
    return <Dashboard analysis={analysis} />
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '24px',
      }}
    >
      <div>
        <h1>K-Pop Music Yearbook</h1>

        {error && <p>{error}</p>}

        <button onClick={loginWithSpotify}>
          Connect with Spotify
        </button>
      </div>
    </main>
  )
}

export default App