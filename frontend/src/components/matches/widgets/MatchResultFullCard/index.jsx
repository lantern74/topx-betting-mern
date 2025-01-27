// styling
import "./index.css";

const MatchResultFullCard = ({ match }) => {
  const formatTimeOnly = (isoString) => {
    const date = new Date(isoString);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Singapore",
    };
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  };

  return (
    <div className="match-card-container">
      <div className="match-card-header">
        <div
          className="match-card-teamname"
          style={{
            textAlign: "left",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "fit-content",
            }}
          >
            {match.homeTeamName}
          </div>
        </div>
        <div style={{ lineHeight: "1.2" }}>
          {/* Star container above time */}
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '4px'
          }}>
            {(() => {
              const getStarCount = (winRate) => {
                const rate = parseFloat(winRate);
                if (rate >= 90) return 3;
                if (rate >= 80) return 2;
                if (rate >= 70) return 1;
                return 0;
              };

              const homeStars = getStarCount(match.homeWinRate);
              const awayStars = getStarCount(match.awayWinRate);
              const totalStars = homeStars + awayStars;

              return totalStars > 0 && Array.from({ length: totalStars }).map((_, i) => (
                <GoldenStar key={`star-${i}`} />
              ));
            })()}
          </div>
          
          <div style={{ color: "#FDCA40", fontSize: "12px" }}>
            {formatTimeOnly(match.time)}
          </div>
          <div>VS</div>
          <div style={{ color: "#34d1bf", fontSize: "12px" }}>{match.id}</div>
        </div>
        <div
          className="match-card-teamname"
          style={{
            textAlign: "right",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "fit-content",
              float: "right",
            }}
          >
            {match.awayTeamName}
          </div>
        </div>
      </div>
    </div>
  );
};

const GoldenStar = () => (
  <div
    style={{
      fontSize: "16px",
      color: "#FFD700",
      filter: "drop-shadow(0 0 2px rgba(255,215,0,0.5))",
    }}
  >
    ★
  </div>
);

export default MatchResultFullCard;
