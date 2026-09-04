import "../styles/dashboard.css";

import Notebook from "./Notebook";
import SchoolStoreReceipt from "./SchoolStoreReceipt";
import TasteEvolutionReport from "./TasteEvolutionReport";
import RankMovement from "./RankMovement";
import ClassRoster from "./ClassRoster";

interface DashboardProps {
  analysis: any;
}

function Dashboard({ analysis }: DashboardProps) {
  const topArtist = analysis?.top_artist;

  const pages = [
    {
      id: "top-of-class",
      number: "01",
      tab: "TOP OF CLASS",
      content: (
        <section className="yearbook-page page-cover">

          <header className="yearbook-header">
            <p className="eyebrow">
              K-POP MUSIC INTELLIGENCE
            </p>

            <h1>
              K-POP MUSIC
              <br />
              YEARBOOK
            </h1>

            <div className="header-meta">
              <span>CLASS OF 2026</span>
              <span>✦</span>
              <span>SPOTIFY EDITION</span>
            </div>
          </header>

          <section className="hero-section">

            <div className="hero-copy">
              <p className="section-label">
                01 — TOP OF THE CLASS
              </p>

              <h2>
                Your music
                <br />
                made the list.
              </h2>

              <p className="hero-description">
                A little yearbook page dedicated to the
                artists who have been taking over your
                listening history.
              </p>
            </div>

            {topArtist && (
              <div className="top-artist-card">

                <div className="photo-frame">
                  {topArtist.image && (
                    <img
                      src={topArtist.image}
                      alt={topArtist.name}
                    />
                  )}
                </div>

                <div className="artist-info">

                  <span className="rank">
                    #01
                  </span>

                  <div>
                    <p className="artist-role">
                      MOST LISTENED ARTIST
                    </p>

                    <h3>
                      {topArtist.name}
                    </h3>
                  </div>

                </div>

                <p className="handwritten">
                  most likely to be played
                </p>

              </div>
            )}

          </section>

        </section>
      ),
    },

    {
      id: "school-store",
      number: "02",
      tab: "SCHOOL STORE",
      content: (
        <section className="yearbook-page">

          <div className="section-heading">
            <p className="section-label">
              02 — THE SCHOOL STORE
            </p>

            <h2>
              Your listening receipt.
            </h2>

            <p className="section-description">
              A little receipt of the artists
              you've been picking up lately.
            </p>
          </div>

          <SchoolStoreReceipt
            shortTerm={
              analysis?.short_term_roster ?? []
            }
            mediumTerm={
              analysis?.medium_term_roster ?? []
            }
            longTerm={
              analysis?.long_term_roster ?? []
            }
          />

        </section>
      ),
    },

    {
      id: "guidance-office",
      number: "03",
      tab: "GUIDANCE OFFICE",
      content: (
        <section className="yearbook-page">

          <TasteEvolutionReport
            shortTerm={
              analysis?.short_term_roster ?? []
            }
            mediumTerm={
              analysis?.medium_term_roster ?? []
            }
            longTerm={
              analysis?.long_term_roster ?? []
            }
            shortVsMedium={
              analysis?.short_vs_medium ?? {
                overlap_percentage: 0,
                common_artists: 0,
              }
            }
            shortVsLong={
              analysis?.short_vs_long ?? {
                overlap_percentage: 0,
                common_artists: 0,
              }
            }
          />

        </section>
      ),
    },

    {
      id: "honor-roll",
      number: "04",
      tab: "HONOR ROLL",
      content: (
        <section className="yearbook-page">

          <div className="section-heading">
            <p className="section-label">
              04 — THE HONOR ROLL
            </p>

            <h2>
              Class superlatives.
            </h2>

            <p className="section-description">
              A few awards for the artists making
              moves in your listening history.
            </p>
          </div>

          <RankMovement
            movements={
              analysis?.rank_movement ?? []
            }
          />

        </section>
      ),
    },

    {
      id: "class-roster",
      number: "05",
      tab: "CLASS ROSTER",
      content: (
        <section className="yearbook-page">

          <div className="section-heading">
            <p className="section-label">
              05 — THE CLASS ROSTER
            </p>

            <h2>
              Everyone made the yearbook.
            </h2>

            <p className="section-description">
              The artists who made it into your
              medium-term listening history.
            </p>
          </div>

          <ClassRoster
            artists={
              analysis?.medium_term_roster ?? []
            }
          />

        </section>
      ),
    },
  ];

  return (
    <main className="yearbook-app">
      <Notebook pages={pages} />
    </main>
  );
}

export default Dashboard;