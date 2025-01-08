import React, { useState, useEffect, useRef } from "react";
import { getRandomInt } from "../../../../utils/random";
import PropTypes from "prop-types";
import { gsap } from "gsap";

// Generate random data based on matchId
const generateTeamCompareData = (matchId) => {
  const baseSeed = matchId?.split('').reduce((acc, char, index) => acc + char.charCodeAt(0) + index + 1, 0) || 123;
  const data = [];
  
  for (let i = 0; i < 15; i++) {
    data.push({
      x: getRandomInt(baseSeed + i + 999, 0, 90),
      red: getRandomInt(baseSeed + i + "a".charCodeAt(0), 50, 150),
      purple: getRandomInt(baseSeed + i + "b".charCodeAt(0), 50, 150),
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
      duration: 1,
      height: (i) => teamData[i].red,
      ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      stagger: 0.2,
    }, 0)
    .to(".red-circle", {
      duration: 1,
      y: (i) => -teamData[i].red - 30,
      ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      stagger: 0.2,
    }, 0);

    // Purple animations (longer duration)
    tl.to(".purple-line", {
      duration: 1.5, // longer duration
      height: (i) => teamData[i].purple,
      ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      stagger: 0.2,
    }, 0) // start at the same time as red
    .to(".purple-circle", {
      duration: 1.5, // longer duration
      y: (i) => -teamData[i].purple - 30, // added the -30 offset like red circles
      ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      stagger: 0.2,
    }, 0); // start at the same time as red
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
            left: (point.x + 5) + "%", // small horizontal offset
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
