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

interface SchoolStoreReceiptProps {
  shortTerm: Artist[]
  mediumTerm: Artist[]
  longTerm: Artist[]
}

interface ReceiptPeriodProps {
  title: string
  subtitle: string
  artists: Artist[]
}

function ReceiptPeriod({
  title,
  subtitle,
  artists,
}: ReceiptPeriodProps) {
  const topArtist = artists[0]
  const otherArtists = artists.slice(1, 5)

  return (
    <article className="receipt-period">
      <div className="receipt-period-header">
        <div>
          <span className="receipt-period-title">
            {title}
          </span>

          <span className="receipt-period-subtitle">
            {subtitle}
          </span>
        </div>

        <span className="receipt-count">
          {artists.length} ITEMS
        </span>
      </div>

      {topArtist && (
        <div className="receipt-top-pick">
          <div className="receipt-featured-photo">
            {topArtist.images?.[0]?.url ? (
              <img
                src={topArtist.images[0].url}
                alt={topArtist.name}
              />
            ) : (
              <span>★</span>
            )}
          </div>

          <div className="receipt-featured-info">
            <span>#01 · TOP PICK</span>
            <h3>{topArtist.name}</h3>
          </div>
        </div>
      )}

      <div className="receipt-items">
        {otherArtists.map((artist, index) => (
          <div
            className="receipt-item"
            key={artist.id}
          >
            <span className="receipt-item-rank">
              {String(index + 2).padStart(2, '0')}
            </span>

            <div className="receipt-mini-photo">
              {artist.images?.[0]?.url ? (
                <img
                  src={artist.images[0].url}
                  alt={artist.name}
                />
              ) : (
                <span>★</span>
              )}
            </div>

            <span className="receipt-item-name">
              {artist.name}
            </span>

            <span className="receipt-item-mark">
              ×1
            </span>
          </div>
        ))}
      </div>

      <div className="receipt-footer">
        <span>MORE IN ROTATION</span>
        <strong>{Math.max(artists.length - 5, 0)}</strong>
      </div>
    </article>
  )
}

function SchoolStoreReceipt({
  shortTerm,
  mediumTerm,
  longTerm,
}: SchoolStoreReceiptProps) {
  return (
    <div className="school-store">
      <div className="receipt-heading">
        <div>
          <span className="receipt-store-name">
            SCHOOL STORE
          </span>

          <h3>YOUR LISTENING RECEIPT</h3>
        </div>

        <span className="receipt-class">
          CLASS OF 2026
        </span>
      </div>

      <div className="receipt-meta">
        <span>STUDENT: YOU</span>
        <span>SPOTIFY EDITION</span>
      </div>

      <div className="receipt-divider">
        * * * * * * * * * * * * * * * *
      </div>

      <div className="receipt-periods">
        <ReceiptPeriod
          title="CURRENT PICKS"
          subtitle="SHORT TERM"
          artists={shortTerm}
        />

        <ReceiptPeriod
          title="REGULARS"
          subtitle="MEDIUM TERM"
          artists={mediumTerm}
        />

        <ReceiptPeriod
          title="OLD FAVORITES"
          subtitle="LONG TERM"
          artists={longTerm}
        />
      </div>

      <div className="receipt-bottom">
        <div className="receipt-total">
          <span>TOTAL ARTISTS IN ROTATION</span>
          <strong>20</strong>
        </div>

        <p>
          THANK YOU FOR SHOPPING
          <br />
          SEE YOU NEXT PERIOD
        </p>

        <div className="receipt-barcode">
          || ||| | |||| || | || ||| | ||
        </div>
      </div>
    </div>
  )
}

export default SchoolStoreReceipt