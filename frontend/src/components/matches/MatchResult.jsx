import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { FaChevronUp } from "react-icons/fa";
import { getRandomInt } from "../../utils/random";
import TeamCompareChart from "./widgets/TeamCompareChart";
import SimpleLineChart from "./widgets/SimpleLineChart";
import PlayerMultiProgress from "./widgets/PlayerMultiProgress";
import "./MatchResult.css";
import useGetMatchResult from "../../hooks/useGetMatchResult";

function MatchResult() {
  const { t } = useTranslation();
  const { id } = useParams(); // Get the match ID from the URL
  const navigate = useNavigate(); // Hook for navigation
  const { data: matchData, isLoading, error } = useGetMatchResult(id);
  const [match, setMatch] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [homeWinRate, setHomeWinRate] = useState(0);
  const [awayWinRate, setAwayWinRate] = useState(0);
  const [evRate, setEvRate] = useState(0);
  const [pbrRate, setPbrRate] = useState(0);
  const [kellyRate, setKellyRate] = useState(0);

  useEffect(() => {
    if (matchData && !match) {
      const userSlug = localStorage.getItem("userSlug");
      setMatch({ ...matchData, slug: userSlug });
    }
  }, [matchData, match]);

  // Increment effect for home and away win rates
  useEffect(() => {
    if (modalVisible && match) {
      const duration = 2000; // Animation duration in milliseconds
      const interval = 20; // Update interval in milliseconds
      const homeIncrement = match.homeWinRate / (duration / interval);
      const awayIncrement = match.awayWinRate / (duration / interval);
      const evIncrement =
        (match.homeWinRate > match.awayWinRate ? match.evHome : match.evAway) /
        (duration / interval);
      const pbrIncrement = (match.homeWinRate > match.awayWinRate
        ? match.pbrHome
        : match.pbrAway) / (duration / interval);
      const kellyIncrement = (match.homeWinRate > match.awayWinRate
        ? match.kellyHome
        : match.kellyAway) / (duration / interval);

      let currentHome = 0;
      let currentAway = 0;
      let currentEv = 0;
      let currentPbr = 0;
      let currentKelly = 0;

      const timer = setInterval(() => {
        currentHome = Math.min(currentHome + homeIncrement, match.homeWinRate);
        currentAway = Math.min(currentAway + awayIncrement, match.awayWinRate);
        currentEv = Math.min(
          currentEv + evIncrement,
          match.homeWinRate > match.awayWinRate ? match.evHome : match.evAway,
        );
        currentPbr = Math.min(
          currentPbr + pbrIncrement,
          match.homeWinRate > match.awayWinRate ? match.pbrHome : match.pbrAway,
        );
        currentKelly = Math.min(
          currentKelly + kellyIncrement,
          match.homeWinRate > match.awayWinRate
            ? match.kellyHome
            : match.kellyAway,
        );

        setHomeWinRate(currentHome);
        setAwayWinRate(currentAway);
        setEvRate(currentEv);
        setPbrRate(currentPbr);
        setKellyRate(currentKelly);

        if (
          currentHome >= match.homeWinRate && currentAway >= match.awayWinRate
        ) {
          clearInterval(timer);
        }
      }, interval);

      return () =>
        clearInterval(timer); // Cleanup on unmount
    }
  }, [modalVisible, match]);

  useEffect(() => {
    if (match) {
      setTimeout(() => setModalVisible(true), 3000);
    }
  }, [match]);

  if (isLoading || !match) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "black",
        }}
      >
        <div className="loading-container">
          <div className="spinner"></div>
          <p style={{ color: "white", marginTop: "10px" }}>{t("加載中...")}</p>
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
    { name: "A", points: 30 },
    { name: "B", points: 90 },
    { name: "C", points: 12 },
    { name: "D", points: 138 },
    { name: "E", points: 40 },
    { name: "F", points: 140 },
    { name: "G", points: 80 },
  ];

  return (
    <div className="result-container">
      <div className="result-header">
        <button
          className="back-button"
          onClick={() => navigate("/view-matches")}
        >
          <i class="bi bi-arrow-left fs-2"></i>
          <span>{t("比賽預測")}</span>
        </button>
      </div>
      
      <div className="team-info-box">
        <img
          src="/images/match/team_stats.webp"
          alt="media"
          className="background-image"
        />
        <div className="team-info">
          <div style={{ flex: "1" }}>
            <div className="team">
              <img
                src={match.homeTeamLogo}
                alt="home team"
                className="club-logo"
              />
              <h6>{match.homeTeamName}</h6>
            </div>
          </div>
          <h6 className="vs-text">VS</h6>
          <div style={{ flex: "1" }}>
            <div className="team">
              <img
                src={match.awayTeamLogo}
                alt="away team"
                className="club-logo"
              />
              <h6>{match.awayTeamName}</h6>
            </div>
          </div>
          <div className="match-slug">{match.slug}</div>
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

      {match.homeWinRate > match.awayWinRate
        ? (
          <div className="ev-rate-box">
            <div className="ev-details">
              <h6>
                {Math.round(evRate)}%<p>{t("EV Rate")}</p>
              </h6>
              <div style={{ width: "100%", height: "200px" }}>
                <SimpleLineChart data={lineChartData} dataKey="points" />
              </div>
              <div className="progress-info">
                <FaChevronUp className="icon positive" />
                <span className="progress-label">+{getRandomInt(match.id?.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) || 123, 10, 20)} %</span>
              </div>
            </div>
            <div className="index-boxes">
              <div
                className="result-index-box"
                style={{
                  backgroundImage: "url('/images/match/kelly_index.webp')",
                }}
              >
                <h6 className="result-index-box-text">
                  {kellyRate.toFixed(2)}
                  <p>{t("Kelly Index")}</p>
                </h6>
              </div>
              <div
                className="result-index-box"
                style={{
                  backgroundImage: "url('/images/match/kelly_index.webp')",
                }}
              >
                <h6 className="result-index-box-text">
                  {pbrRate.toFixed(2)}%<p>{t("P to B Ratio")}</p>
                </h6>
              </div>
            </div>
          </div>
        )
        : (
          <div className="ev-rate-box">
            <div className="ev-details">
              <h6>
                {Math.round(evRate)}%<p>EV Rate</p>
              </h6>
              <div style={{ width: "100%", height: "200px" }}>
                <SimpleLineChart data={lineChartData} dataKey="points" />
              </div>
              <div className="progress-info">
                <FaChevronUp className="icon positive" />
                <span className="progress-label">+{getRandomInt(match.id?.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) || 123, 10, 20)} %</span>
              </div>
              {console.log("MatchResult.jsx: match.id =", match.id)}
            </div>
            <div className="index-boxes">
              <div
                className="result-index-box"
                style={{
                  backgroundImage: "url('/images/match/kelly_index.webp')",
                }}
              >
                <h6 className="result-index-box-text">
                  {kellyRate.toFixed(2)}
                  <p>Kelly Index</p>
                </h6>
              </div>
              <div
                className="result-index-box"
                style={{
                  backgroundImage: "url('/images/match/kelly_index.webp')",
                }}
              >
                <h6 className="result-index-box-text">
                  {pbrRate.toFixed(2)}%<p>P to B Ratio</p>
                </h6>
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
