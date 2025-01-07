import React, { useEffect, useState, useRef } from "react";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
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
  const homeWinRef = useRef(null);
  const awayWinRef = useRef(null);
  const evRateRef = useRef(null);
  const pbrRateRef = useRef(null);
  const kellyRateRef = useRef(null);
  
  const isHomeWinVisible = useIntersectionObserver(homeWinRef, { threshold: 0.2 });
  const isAwayWinVisible = useIntersectionObserver(awayWinRef, { threshold: 0.2 });
  const isEvRateVisible = useIntersectionObserver(evRateRef, { threshold: 0.2 });
  const isPbrRateVisible = useIntersectionObserver(pbrRateRef, { threshold: 0.2 });
  const isKellyRateVisible = useIntersectionObserver(kellyRateRef, { threshold: 0.2 });

  // Home win rate animation
  useEffect(() => {
    if (isHomeWinVisible && match) {
      const duration = 2000;
      const interval = 20;
      const increment = match.homeWinRate / (duration / interval);
      let current = 0;

      const timer = setInterval(() => {
        current = Math.min(current + increment, match.homeWinRate);
        setHomeWinRate(current);
        
        if (current >= match.homeWinRate) {
          clearInterval(timer);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isHomeWinVisible, match]);

  // Away win rate animation
  useEffect(() => {
    if (isAwayWinVisible && match) {
      const duration = 2000;
      const interval = 20;
      const increment = match.awayWinRate / (duration / interval);
      let current = 0;

      const timer = setInterval(() => {
        current = Math.min(current + increment, match.awayWinRate);
        setAwayWinRate(current);
        
        if (current >= match.awayWinRate) {
          clearInterval(timer);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isAwayWinVisible, match]);

  // EV rate animation
  useEffect(() => {
    if (isEvRateVisible && match) {
      const duration = 2000;
      const interval = 20;
      const targetEv = match.homeWinRate > match.awayWinRate ? match.evHome : match.evAway;
      const increment = targetEv / (duration / interval);
      let current = 0;

      const timer = setInterval(() => {
        current = Math.min(current + increment, targetEv);
        setEvRate(current);
        
        if (current >= targetEv) {
          clearInterval(timer);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isEvRateVisible, match]);

  // PBR rate animation
  useEffect(() => {
    if (isPbrRateVisible && match) {
      const duration = 2000;
      const interval = 20;
      const targetPbr = match.homeWinRate > match.awayWinRate ? match.pbrHome : match.pbrAway;
      const increment = targetPbr / (duration / interval);
      let current = 0;

      const timer = setInterval(() => {
        current = Math.min(current + increment, targetPbr);
        setPbrRate(current);
        
        if (current >= targetPbr) {
          clearInterval(timer);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isPbrRateVisible, match]);

  // Kelly rate animation
  useEffect(() => {
    if (isKellyRateVisible && match) {
      const duration = 2000;
      const interval = 20;
      const targetKelly = match.homeWinRate > match.awayWinRate ? match.kellyHome : match.kellyAway;
      const increment = targetKelly / (duration / interval);
      let current = 0;

      const timer = setInterval(() => {
        current = Math.min(current + increment, targetKelly);
        setKellyRate(current);
        
        if (current >= targetKelly) {
          clearInterval(timer);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isKellyRateVisible, match]);


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
          <p style={{ color: "white", marginTop: "10px" }}>{t("分析中...")}</p>
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

  const baseSeed = id?.split('').reduce((acc, char, index) => acc + char.charCodeAt(0) + index + 1, 0) || 123;
  const lineChartData = [
    { name: "A", points: getRandomInt(baseSeed + "A".charCodeAt(0), 10, 150) },
    { name: "B", points: getRandomInt(baseSeed + "B".charCodeAt(0), 10, 150) },
    { name: "C", points: getRandomInt(baseSeed + "C".charCodeAt(0), 10, 150) },
    { name: "D", points: getRandomInt(baseSeed + "D".charCodeAt(0), 10, 150) },
    { name: "E", points: getRandomInt(baseSeed + "E".charCodeAt(0), 10, 150) },
    { name: "F", points: getRandomInt(baseSeed + "F".charCodeAt(0), 10, 150) },
    { name: "G", points: getRandomInt(baseSeed + "G".charCodeAt(0), 10, 150) },
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
          <h4 className="home-rate" ref={homeWinRef}>{Math.round(homeWinRate)}%</h4>
          <span className="separator"></span>
          <h4 className="away-rate" ref={awayWinRef}>{Math.round(awayWinRate)}%</h4>
        </div>
        <TeamCompareChart matchId={id} />
      </div>

      {match.homeWinRate > match.awayWinRate
        ? (
          <div className="ev-rate-box" ref={evRateRef}>
            <div className="ev-details">
              <h6>
                {Math.round(evRate)}%<p>{t("EV Rate")}</p>
              </h6>
              <div style={{ width: "100%", height: "200px" }}>
                <SimpleLineChart data={lineChartData} dataKey="points" />
              </div>
              <div className="progress-info">
                <FaChevronUp className="icon positive" />
                <span className="progress-label">+{getRandomInt(baseSeed + "p".charCodeAt(0), 10, 20)} %</span>
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
                  <span ref={kellyRateRef}>{kellyRate.toFixed(2)}</span>
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
                  <span ref={pbrRateRef}>{pbrRate.toFixed(2)}%</span><p>{t("P to B Ratio")}</p>
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
                <span className="progress-label">+{getRandomInt(baseSeed + "p".charCodeAt(0), 10, 20)} %</span>
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
