import React, { useState, useEffect, useRef } from "react";
import { getRandomInt } from "../../../../utils/random";
import PropTypes from "prop-types";
import { gsap } from "gsap";

// Generate random data based on matchId
const generateTeamCompareData = (matchId) => {
  const baseSeed = matchId?.split('').reduce((acc, char, index) => acc + char.charCodeAt(0) + index + 1, 0) || 123;
  const data = [];
  const xStep = 90 / 15; // Evenly distribute across 90% width
    
  for (let i = 0; i < 15; i++) {
    // Add more variation by using different multipliers and ranges
    const redBase = getRandomInt(baseSeed + i + "a".charCodeAt(0), 30, 180);
    const purpleBase = getRandomInt(baseSeed + i + "b".charCodeAt(0), 30, 180);
    
    // Add some random spikes and dips
    const redVariation = getRandomInt(baseSeed + i + "c".charCodeAt(0), -40, 40);
    const purpleVariation = getRandomInt(baseSeed + i + "d".charCodeAt(0), -40, 40);
    
    data.push({
      x: xStep * i + 5, // Start at 5% and space evenly
      red: Math.min(Math.max(redBase + redVariation, 30), 200), // Clamp between 30-200
      purple: Math.min(Math.max(purpleBase + purpleVariation, 30), 200), // Clamp between 30-200
    });
  }
    
  return data;
};


const TeamCompareChart = ({ matchId }) => {
  const [teamData, setTeamData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    setTeamData(generateTeamCompareData(matchId));
  }, [matchId]);

  useEffect(() => {
    if (!chartRef.current || teamData.length === 0) return;

    const tl = gsap.timeline();

    // Animate both red and purple simultaneously but with different durations
    // Red animations
    tl.to(".red-line", {
      duration: 0.6,
      height: (i) => teamData[i].red,
      ease: "power2.out",
      stagger: 0.1,
    }, 0)
    .to(".red-circle", {
      duration: 0.6,
      y: (i) => -teamData[i].red - 30,
      ease: "power2.out",
      stagger: 0.1,
    }, 0);

    // Purple animations
    tl.to(".purple-line", {
      duration: 0.8,
      height: (i) => teamData[i].purple,
      ease: "power2.out",
      stagger: 0.1,
    }, 0)
    .to(".purple-circle", {
      duration: 0.8,
      y: (i) => -teamData[i].purple - 30,
      ease: "power2.out",
      stagger: 0.1,
    }, 0);
  }, [teamData]);

  return (
    <div
      ref={chartRef}
      style={{
        position: "relative",
        width: "100%",
        height: "300px",
        background: "#111312",
        overflow: "hidden",
      }}
    >
      {/* RED items */}
      {teamData.map((point, i) => (
        <div
          key={`red-${i}`}
          className="red-item"
          style={{
            position: "absolute",
            left: point.x + "%",
            bottom: 0,
          }}
        >
          {/* trailing line with gradient */}
          <div
            className="red-line"
            style={{
              width: "2px",
              height: 0,
              margin: "auto",
              background: "linear-gradient(to bottom, #ED0423, rgba(237,4,35,0))",
            }}
          />
          {/* circle with spacing */}
          <div style={{ height: "15px" }} />
          <div
            className="red-circle"
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#ED0423",
              transform: "translateY(0)",
            }}
          />
        </div>
      ))}

      {/* PURPLE items */}
      {teamData.map((point, i) => (
        <div
          key={`purple-${i}`}
          className="purple-item"
          style={{
            position: "absolute",
            left: (point.x + 2) + "%", // smaller offset to prevent overlap
            bottom: 0,
          }}
        >
          {/* trailing line with gradient */}
          <div
            className="purple-line"
            style={{
              width: "2px",
              height: 0,
              margin: "auto",
              background: "linear-gradient(to bottom, #6665DD, rgba(102,101,221,0))",
            }}
          />
          {/* circle with spacing */}
          <div style={{ height: "15px" }} />
          <div
            className="purple-circle"
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#6665DD",
              transform: "translateY(0)",
            }}
          />
        </div>
      ))}
    </div>
  );
};

TeamCompareChart.propTypes = {
  matchId: PropTypes.string.isRequired,
};

export default TeamCompareChart;
