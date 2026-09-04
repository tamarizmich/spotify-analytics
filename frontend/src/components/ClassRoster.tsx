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

interface ClassRosterProps {
  artists: Artist[]
}

function ClassRoster({ artists }: ClassRosterProps) {
  return (
    <div className="class-roster">
      {artists.map((artist, index) => (
        <article
          className="roster-card"
          key={artist.id}
        >
          <div className="roster-photo">
            {artist.images?.[0]?.url ? (
              <img
                src={artist.images[0].url}
                alt={artist.name}
              />
            ) : (
              <div className="roster-placeholder">
                ★
              </div>
            )}

            <span className="roster-rank">
              #{index + 1}
            </span>
          </div>

          <div className="roster-info">
            <span className="roster-number">
              {String(index + 1).padStart(2, '0')}
            </span>

            <h3>{artist.name}</h3>

            <span className="roster-caption">
              CLASS OF 2026
            </span>
          </div>
        </article>
      ))}
    </div>
  )
}

export default ClassRoster