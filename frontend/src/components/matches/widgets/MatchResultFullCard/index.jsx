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
          style={{ textAlign: "left", position: "relative" }}
        >
          {match.homeTeamName}
          {/* MOVE OUT, MAKE PARENT A FLEX COLUMN*/}
          {match.homeWinRate && parseFloat(match.homeWinRate) >= 90 && (
            <GoldenStar />
          )}
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
          style={{ textAlign: "right", position: "relative" }}
        >
          {match.awayTeamName}
          {/* MOVE OUT, MAKE PARENT A FLEX COLUMN*/}
          {match.homeWinRate && parseFloat(match.homeWinRate) >= 90 && (
            <GoldenStar />
          )}
        </div>
      </div>
    </div>
  );
};

const GoldenStar = () => (
  <div
    style={{
      position: "absolute",
      top: "-8px",
      right: "-8px",
      fontSize: "16px",
      color: "#FFD700",
      filter: "drop-shadow(0 0 2px rgba(255,215,0,0.5))",
    }}
  >
    ★
  </div>
);

export default MatchResultFullCard;
