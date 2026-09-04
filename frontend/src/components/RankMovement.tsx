interface RankMovementItem {
  id: string;
  name: string;
  image?: string | null;
  first_rank: number;
  second_rank: number;
  change: number;
}

interface RankMovementProps {
  movements: RankMovementItem[];
}

function RankMovement({ movements }: RankMovementProps) {
  if (!movements.length) {
    return null;
  }

  const rising = [...movements]
    .filter((artist) => artist.change > 0)
    .sort((a, b) => b.change - a.change);

  const falling = [...movements]
    .filter((artist) => artist.change < 0)
    .sort((a, b) => a.change - b.change);

  const stable = movements.filter((artist) => artist.change === 0);

  const mostImproved = rising[0];
  const biggestDrop = falling[0];
  const classFavorite = movements.find((artist) => artist.second_rank === 1);
  const stayingPower = stable[0];

  return (
    <div className="superlatives">
      {/* MOST IMPROVED */}
      {mostImproved && (
        <article className="superlative-card improved">
          <div className="superlative-top">
            <span className="superlative-number">01</span>

            <span className="superlative-label">MOST IMPROVED</span>
          </div>

          <div className="superlative-content">
            <div className="artist-photo">
              {mostImproved.image ? (
                <img src={mostImproved.image} alt={mostImproved.name} />
              ) : (
                <span>★</span>
              )}
            </div>

            <div className="superlative-info">
              <h3>{mostImproved.name}</h3>

              <p className="rank-transition">
                #{mostImproved.first_rank}
                <span>→</span>#{mostImproved.second_rank}
              </p>

              <p className="superlative-note">↑ on the rise</p>
            </div>
          </div>
        </article>
      )}

      {/* BIGGEST DROP */}
      {biggestDrop && (
        <article className="superlative-card dropped">
          <div className="superlative-top">
            <span className="superlative-number">02</span>

            <span className="superlative-label">BIGGEST DROP</span>
          </div>

          <div className="superlative-content">
            <div className="artist-photo">
              {biggestDrop.image ? (
                <img src={biggestDrop.image} alt={biggestDrop.name} />
              ) : (
                <span>✦</span>
              )}
            </div>

            <div className="superlative-info">
              <h3>{biggestDrop.name}</h3>

              <p className="rank-transition">
                #{biggestDrop.first_rank}
                <span>→</span>#{biggestDrop.second_rank}
              </p>

              <p className="superlative-note">↓ we need to talk</p>
            </div>
          </div>
        </article>
      )}

      {/* CLASS FAVORITE */}
      {classFavorite && (
        <article className="superlative-card favorite">
          <div className="superlative-top">
            <span className="superlative-number">03</span>

            <span className="superlative-label">CLASS FAVORITE</span>
          </div>

          <div className="favorite-content">
            <p className="favorite-rank">#01</p>

            <h3>{classFavorite.name}</h3>

            <p className="superlative-note">everyone knows their name</p>
          </div>
        </article>
      )}

      {/* STAYING POWER */}
      {stayingPower && (
        <article className="superlative-card stable-card">
          <div className="superlative-top">
            <span className="superlative-number">04</span>

            <span className="superlative-label">STAYING POWER</span>
          </div>

          <div className="stable-content">
            <h3>{stayingPower.name}</h3>

            <p>
              #{stayingPower.first_rank} → #{stayingPower.second_rank}
            </p>

            <span className="superlative-note">→ still going strong</span>
          </div>
        </article>
      )}

      {/* MINI HONOR ROLL */}
      {rising.length > 1 && (
        <div className="mini-honor-roll">
          <span className="mini-label">ALSO ON THE RISE</span>

          <div className="mini-names">
            {rising.slice(1, 5).map((artist) => (
              <span key={artist.id}>
                {artist.name}
                <b>+{artist.change}</b>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RankMovement;
