import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from "react-router-dom";
import { FaChevronUp } from "react-icons/fa";
import TeamCompareChart from "./widgets/TeamCompareChart";
import SimpleLineChart from "./widgets/SimpleLineChart";
import PlayerMultiProgress from "./widgets/PlayerMultiProgress"
import './MatchResult.css'
import useGetMatchResult from '../../hooks/useGetMatchResult';

function MatchResult() {
  const { t } = useTranslation();
  const { id } = useParams(); // Get the match ID from the URL
  const navigate = useNavigate(); // Hook for navigation
  const { data: match, isLoading, error } = useGetMatchResult(id);
  const [modalVisible, setModalVisible] = useState(false);
  const [homeWinRate, setHomeWinRate] = useState(0);
  const [awayWinRate, setAwayWinRate] = useState(0);

  // Increment effect for home and away win rates
  useEffect(() => {
    if (modalVisible && match) {
      const duration = 2000; // Animation duration in milliseconds
      const interval = 20; // Update interval in milliseconds
      const homeIncrement = match.homeWinRate / (duration / interval);
      const awayIncrement = match.awayWinRate / (duration / interval);

      let currentHome = 0;
      let currentAway = 0;

      const timer = setInterval(() => {
        currentHome = Math.min(currentHome + homeIncrement, match.homeWinRate);
        currentAway = Math.min(currentAway + awayIncrement, match.awayWinRate);

        setHomeWinRate(currentHome);
        setAwayWinRate(currentAway);

        if (currentHome >= match.homeWinRate && currentAway >= match.awayWinRate) {
          clearInterval(timer);
        }
      }, interval);

      return () => clearInterval(timer); // Cleanup on unmount
    }
  }, [modalVisible, match]);

  useEffect(() => {
    if(match) {
      setTimeout(() => setModalVisible(true), 3000);
    }
  }, [match])

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "black" }}>
        <div className="loading-container">
          <div className="spinner"></div>
          <p style={{ color: 'white', marginTop: '10px' }}>{t("加載中...")}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div sx={{ textAlign: "center", marginTop: "20px" }}>
        <h6>
          {error}
        </h6>
      </div>
    );
  }

  const lineChartData = [
    { name: 'A', points: 30 },
    { name: 'B', points: 90 },
    { name: 'C', points: 12 },
    { name: 'D', points: 138 },
    { name: 'E', points: 40 },
    { name: 'F', points: 140 },
    { name: 'G', points: 80 },
];


return (
    <div className="result-container">
      <div className="result-header">
        <button className="back-button" onClick={() => navigate("/view-matches")}><i class="bi bi-arrow-left fs-2"></i><span>{t("比赛结果")}</span></button>
      </div>

      <div className="team-info-box">
        <img src="/images/match/team_stats.webp" alt="media" className="background-image" />
        <div className="team-info">
          <div style={{flex:"1"}}>
            <div className="team">
              <img src={match.homeTeamLogo} alt="home team" className="club-logo" />
              <h6>{match.homeTeamName}</h6>
            </div>
          </div>
          <h6 className="vs-text">VS</h6>
          <div style={{flex:"1"}}>
            <div className="team">
              <img src={match.awayTeamLogo} alt="away team" className="club-logo" />
              <h6>{match.awayTeamName}</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="comparison-box">
        <div className="win-rate">
          <h4 className="home-rate">{Math.round(homeWinRate)}%</h4>
          <span className="separator"></span>
          <h4 className="away-rate">{Math.round(awayWinRate)}%</h4>
        </div>
        <TeamCompareChart />
      </div>

      {match.homeWinRate > match.awayWinRate ? (
        <div className="ev-rate-box">
          <div className="ev-details">
            <h6>{match.evHome}%<p>{t("EV Rate")}</p></h6>
            <div style={{ width: '100%', height:"200px"}}>
                <SimpleLineChart data={lineChartData} dataKey="points" />
            </div>
            <div className="progress-info">
              <FaChevronUp className="icon positive" />
              <span className="progress-label">+18 %</span>
            </div>
          </div>
          <div className="index-boxes">
            <div className="result-index-box" style={{ backgroundImage: "url('/images/match/kelly_index.webp')" }}>
              <h6 className="result-index-box-text">{match.kellyHome}<p>{t("Kelly Index")}</p></h6>
            </div>
            <div className="result-index-box" style={{ backgroundImage: "url('/images/match/kelly_index.webp')" }}>
              <h6 className="result-index-box-text">{match.pbrHome}%<p>{t("P to B Ratio")}</p></h6>
            </div>
          </div>
        </div>
      ) : (
        <div className="ev-rate-box">
          <div className="ev-details">
            <h6>{match.evAway}%<p>EV Rate</p></h6>
            <div style={{ width: '100%', height:"200px"}}>
                <SimpleLineChart data={lineChartData} dataKey="points" />
            </div>
            <div className="progress-info">
              <FaChevronUp className="icon positive" />
              <span className="progress-label">+18 %</span>
            </div>
          </div>
          <div className="index-boxes">
            <div className="result-index-box" style={{ backgroundImage: "url('/images/match/kelly_index.webp')" }}>
              <h6 className="result-index-box-text">{match.kellyAway}<p>Kelly Index</p></h6>
            </div>
            <div className="result-index-box" style={{ backgroundImage: "url('/images/match/kelly_index.webp')" }}>
              <h6 className="result-index-box-text">{match.pbrAway}%<p>P to B Ratio</p></h6>
            </div>
          </div>
        </div>
      )}

      <div className="player-progress-box">
        <PlayerMultiProgress />
      </div>
    </div>
  );
}

export default MatchResult;
