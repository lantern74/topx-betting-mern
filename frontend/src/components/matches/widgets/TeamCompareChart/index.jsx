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
      a: getRandomInt(baseSeed + i + "a".charCodeAt(0), 50, 150),
      b: getRandomInt(baseSeed + i + "b".charCodeAt(0), 50, 150)
    });
  }
  
  return data;
};


const TeamCompareChart = ({ matchId }) => {
  const [teamCompare, setTeamCompare] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    setTeamCompare(generateTeamCompareData(matchId));
  }, [matchId]);
  useEffect(() => {
    if (teamCompare.length === 0) return;
    
    // Animate all circles except last
    gsap.to(".compare-circle:not(:last-child)", {
      duration: 0.8,
      y: -220,
      ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      stagger: 0.1,
    });

    // Animate last circle with different easing
    gsap.to(".compare-circle:last-child", {
      duration: 0.8,
      y: -220,
      ease: "cubic-bezier(0.7, 0, 0.3, 1)",
      delay: 0.6, // Start after most circles have begun
    });
  }, [teamCompare]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "300px",
        background: "#111312",
        overflow: "hidden",
      }}
    >
      {teamCompare.map((point, i) => (
        <div
          key={i}
          className="compare-circle"
          style={{
            position: "absolute",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: i % 2 === 0 ? "#ED0423" : "#6665DD",
            left: `${(i / (teamCompare.length - 1)) * 95}%`,
            bottom: "-50px",
          }}
        />
      ))}
    </div>
  );
};

TeamCompareChart.propTypes = {
  matchId: PropTypes.string.isRequired,
};

export default TeamCompareChart;
