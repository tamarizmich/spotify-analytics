interface Artist {
  id: string
  name: string
  uri: string
  images: {
    url: string
    height?: number | null
    width?: number | null
  }[]
}

interface TasteEvolutionReportProps {
  shortTerm: Artist[]
  mediumTerm: Artist[]
  longTerm: Artist[]
  shortVsMedium: {
    overlap_percentage: number
    common_artists: number
  }
  shortVsLong: {
    overlap_percentage: number
    common_artists: number
  }
}

function getCommonArtists(
  first: Artist[],
  second: Artist[]
) {
  const secondIds = new Set(
    second.map((artist) => artist.id)
  )

  return first.filter((artist) =>
    secondIds.has(artist.id)
  )
}

interface EvolutionComparisonProps {
  label: string
  subtitle: string
  percentage: number
  commonArtists: Artist[]
  note: string
}

function EvolutionComparison({
  label,
  subtitle,
  percentage,
  commonArtists,
  note,
}: EvolutionComparisonProps) {
  return (
    <article className="evolution-comparison">
      <div className="evolution-comparison-header">
        <div>
          <span className="evolution-label">
            {label}
          </span>

          <span className="evolution-subtitle">
            {subtitle}
          </span>
        </div>

        <span className="evolution-status">
          KEPT
        </span>
      </div>

      <div className="evolution-score">
        <strong>{percentage}%</strong>

        <div className="evolution-score-copy">
          <span>
            {commonArtists.length} / 20 ARTISTS
          </span>

          <p>{note}</p>
        </div>
      </div>

      <div className="evolution-bar">
        <span
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <div className="survivor-heading">
        <span>THE ONES WHO STAYED</span>
        <small>
          {commonArtists.length} survivors
        </small>
      </div>

      <div className="survivor-list">
        {commonArtists.slice(0, 5).map((artist) => (
          <div
            className="survivor"
            key={artist.id}
          >
            <div className="survivor-photo">
              {artist.images?.[0]?.url ? (
                <img
                  src={artist.images[0].url}
                  alt={artist.name}
                />
              ) : (
                <span>★</span>
              )}
            </div>

            <span>{artist.name}</span>

            <b>✓</b>
          </div>
        ))}
      </div>

      {commonArtists.length > 5 && (
        <p className="survivor-more">
          + {commonArtists.length - 5} more made it through
        </p>
      )}
    </article>
  )
}

function TasteEvolutionReport({
  shortTerm,
  mediumTerm,
  longTerm,
  shortVsMedium,
  shortVsLong,
}: TasteEvolutionReportProps) {
  const shortMediumCommon = getCommonArtists(
    shortTerm,
    mediumTerm
  )

  const shortLongCommon = getCommonArtists(
    shortTerm,
    longTerm
  )

  const longTermSurvivors = getCommonArtists(
    mediumTerm,
    longTerm
  )

  const topArtist = shortTerm[0]

  let counselorNote =
    "Your taste has been evolving."

  if (
    shortTerm[0]?.id === mediumTerm[0]?.id &&
    mediumTerm[0]?.id === longTerm[0]?.id
  ) {
    counselorNote =
      `${topArtist?.name} appears to be a permanent situation.`
  } else if (
    shortVsLong.overlap_percentage >= 50
  ) {
    counselorNote =
      "Consistency is clearly your thing."
  } else if (
    shortVsLong.overlap_percentage <= 25
  ) {
    counselorNote =
      "Your musical taste has been through some changes."
  }

  return (
    <div className="taste-report">

      {/* REPORT HEADER */}

      <div className="report-top">
        <div>
          <span className="report-office">
            GUIDANCE OFFICE
          </span>

          <h3>
            TASTE EVOLUTION
            <br />
            REPORT
          </h3>
        </div>

        <div className="report-stamp">
          <span>STUDENT</span>
          <strong>RECORD</strong>
          <small>2026</small>
        </div>
      </div>

      <div className="report-meta">
        <span>STUDENT: YOU</span>
        <span>DEPARTMENT: MUSIC</span>
        <span>STATUS: ACTIVE</span>
      </div>

      <div className="report-rule">
        ─────────────────────────────────────────────
      </div>

      {/* INTRO */}

      <div className="report-intro">
        <div>
          <span className="report-question">
            MUSICAL DEVELOPMENT
          </span>

          <h4>
            What stayed.
            <br />
            What changed.
            <br />
            What made it through.
          </h4>
        </div>

        <p>
          An analysis of your listening history
          across different periods, identifying
          the artists who survived the evolution
          of your taste.
        </p>
      </div>

      {/* COMPARISONS */}

      <div className="evolution-grid">
        <EvolutionComparison
          label="CURRENT ERA"
          subtitle="SHORT × MEDIUM"
          percentage={
            shortVsMedium?.overlap_percentage ?? 0
          }
          commonArtists={shortMediumCommon}
          note="Your current rotation is still close to your regular taste."
        />

        <EvolutionComparison
          label="LONG-TERM TASTE"
          subtitle="SHORT × LONG"
          percentage={
            shortVsLong?.overlap_percentage ?? 0
          }
          commonArtists={shortLongCommon}
          note="These artists managed to survive across your listening history."
        />
      </div>

      {/* SURVIVORS */}

      <div className="long-term-section">
        <div className="long-term-heading">
          <div>
            <span>PERMANENT RECORD</span>
            <h4>THE LONG-TERM SURVIVORS</h4>
          </div>

          <strong>
            {longTermSurvivors.length}
          </strong>
        </div>

        <div className="survivor-strip">
          {longTermSurvivors.slice(0, 6).map(
            (artist) => (
              <div
                className="survivor-large"
                key={artist.id}
              >
                <div className="survivor-large-photo">
                  {artist.images?.[0]?.url ? (
                    <img
                      src={artist.images[0].url}
                      alt={artist.name}
                    />
                  ) : (
                    <span>★</span>
                  )}
                </div>

                <span>{artist.name}</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* COUNSELOR NOTE */}

      <div className="counselor-note">
        <div className="note-line">
          <span>COUNSELOR'S NOTE</span>
          <span>________________</span>
        </div>

        <p>
          "{counselorNote}"
        </p>

        <div className="counselor-signature">
          <span>Music Guidance Office</span>
          <strong>✓ APPROVED</strong>
        </div>
      </div>

    </div>
  )
}

export default TasteEvolutionReport