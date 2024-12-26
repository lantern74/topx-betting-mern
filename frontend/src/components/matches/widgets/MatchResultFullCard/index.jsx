// styling
import './index.css';

const MatchResultFullCard = ({match}) => {

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
                <div className='match-card-teamname' style={{textAlign:"left"}}>
                    {match.homeTeamName}
                </div>
                <div style={{lineHeight:"1.2"}}>
                    <div style={{color:'#FDCA40', fontSize:'12px'}}>{formatTimeOnly(match.time)}</div>
                    <div>VS</div>
                    <div style={{color:"#34d1bf", fontSize:'12px'}}>{match.id}</div>
                </div>
                <div className='match-card-teamname' style={{textAlign:"right"}}>
                    {match.awayTeamName}
                </div>
            </div>
        </div>
    )
}

export default MatchResultFullCard