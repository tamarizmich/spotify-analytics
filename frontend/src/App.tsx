import { useEffect, useState } from "react";

import Dashboard from "./components/Dashboard";

import { getSpotifyAnalysis } from "./services/spotify";

function App() {
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isOpening, setIsOpening] = useState(false);

  const loginWithSpotify = () => {
    setIsOpening(true);

    setTimeout(() => {
      window.location.href =
        "http://127.0.0.1:8000/auth/login";
    }, 500);
  };

  useEffect(() => {
    getSpotifyAnalysis()
      .then(setAnalysis)
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  /*
   * YEARBOOK COVER / LOGIN
   */
  if (!analysis) {
    return (
      <main className="yearbook-login">

        <div className="login-desk">

          {/* Decorative desk objects */}
          <div className="login-decoration login-pencil">
            ✎
          </div>

          <div className="login-decoration login-star">
            ★
          </div>

          <div className="login-decoration login-star-two">
            ✦
          </div>

          <div className="login-paperclip">
            ⌇
          </div>

          {/* YEARBOOK */}
          <section
            className={`yearbook-cover ${
              isOpening ? "opening" : ""
            }`}
          >

            <div className="cover-tape tape-one" />
            <div className="cover-tape tape-two" />

            <div className="cover-content">

              <p className="cover-eyebrow">
                PERSONAL LISTENING ARCHIVE
              </p>

              <div className="cover-title">
                <span>K-POP</span>
                <strong>MUSIC</strong>
                <strong>YEARBOOK</strong>
              </div>

              <div className="cover-divider">
                <span>✦</span>
                <i />
                <span>✦</span>
              </div>

              <p className="cover-subtitle">
                Your listening history,
                <br />
                printed in memories.
              </p>

              <div className="cover-photo">
                <div className="photo-placeholder">
                  <span>★</span>

                  <p>
                    YOUR
                    <br />
                    MUSIC
                    <br />
                    ERA
                  </p>

                  <small>
                    SPOTIFY EDITION
                  </small>
                </div>
              </div>

              <div className="cover-meta">
                <span>CLASS OF 2026</span>
                <span>✦</span>
                <span>K-POP EDITION</span>
              </div>

              <button
                className="open-yearbook-button"
                onClick={loginWithSpotify}
                disabled={isOpening}
              >
                <span>
                  {isOpening
                    ? "OPENING..."
                    : "OPEN MY YEARBOOK"}
                </span>

                <strong>→</strong>
              </button>

              <p className="spotify-hint">
                connect with Spotify to continue
              </p>

              {error && (
                <p className="login-error">
                  {error}
                </p>
              )}

            </div>

            {/* Cover details */}
            <div className="cover-corner top-left">
              ✦
            </div>

            <div className="cover-corner bottom-right">
              ✦
            </div>

            <span className="cover-handwriting">
              made for the songs
              <br />
              you played too much ♡
            </span>

          </section>

          {/* Bottom desk note */}
          <div className="login-note">
            <span>✎</span>
            <p>
              A little yearbook
              <br />
              for your music taste.
            </p>
          </div>

        </div>

      </main>
    );
  }

  /*
   * MAIN YEARBOOK
   */
  return (
    <Dashboard
      analysis={analysis}
    />
  );
}

export default App;