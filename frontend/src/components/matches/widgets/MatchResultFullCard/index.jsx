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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative"
          }}
        >
          {match.homeWinRate && parseFloat(match.homeWinRate) >= 90 && (
            <GoldenStar />
          )}
          {match.homeTeamName}
        </div>
        <div style={{ lineHeight: "1.2" }}>
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative"
          }}
        >
          {match.awayWinRate && parseFloat(match.awayWinRate) >= 90 && (
            <GoldenStar />
          )}
          {match.awayTeamName}
        </div>
      </div>
    </div>
  );
};

const GoldenStar = () => (
  <div style={{
    fontSize: "16px",
    color: "#FFD700",
    filter: "drop-shadow(0 0 2px rgba(255,215,0,0.5))",
    marginBottom: "4px"
  }}>
    ★
  </div>
);

export default MatchResultFullCard;
