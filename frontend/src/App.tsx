import { useEffect, useState } from "react";

import Dashboard from "./components/Dashboard";
import Charts from "./components/Charts";
import MusicalPersonality from "./components/MusicalPersonality";
import Insights from "./components/Insights";
import Notes from "./components/Notes";

import { getSpotifyAnalysis } from "./services/spotify";

type Section = "dashboard" | "charts" | "personality" | "insights" | "notes";

function App() {
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [section, setSection] = useState<Section>("dashboard");

  const loginWithSpotify = () => {
    window.location.href = "http://127.0.0.1:8000/auth/login";
  };

  useEffect(() => {
    getSpotifyAnalysis()
      .then(setAnalysis)
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (!analysis) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "24px",
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
    );
  }

  switch (section) {
    case "charts":
      return (
        <Charts
          analysis={analysis}
          onBack={() => setSection("dashboard")}
        />
      );

    case "personality":
      return (
        <MusicalPersonality
          analysis={analysis}
          onBack={() => setSection("dashboard")}
        />
      );

    case "insights":
      return (
        <Insights
          analysis={analysis}
          onBack={() => setSection("dashboard")}
        />
      );

    case "notes":
      return (
        <Notes
          analysis={analysis}
          onBack={() => setSection("dashboard")}
        />
      );

    default:
      return (
        <Dashboard
          analysis={analysis}
          onDeskNavigate={(destination: string) => {
            setSection(destination as Section);
          }}
        />
      );
  }
}

export default App;