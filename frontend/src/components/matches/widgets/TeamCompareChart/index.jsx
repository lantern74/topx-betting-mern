import React from "react";
import { Cell, ResponsiveContainer, Scatter, ScatterChart, XAxis, YAxis } from "recharts";

// Static Data
const team_compare = [
    { a: 55, b: 62 },
    { a: 78, b: 99 },
    { a: 123, b: 67 },
    { a: 70, b: 133 },
    { a: 88, b: 102 },
    { a: 92, b: 58 },
    { a: 148, b: 71 },
    { a: 54, b: 136 },
    { a: 85, b: 107 },
    { a: 81, b: 111 },
    { a: 65, b: 97 },
    { a: 121, b: 106 },
    { a: 68, b: 75 },
    { a: 126, b: 110 },
    { a: 91, b: 114 }
];

// Custom Scatter Shape
const CustomScatterShape = ({ cx, cy, fill }) => {
    const color = fill === "#ED0423" ? "red" : "purple";
  
    return (
      <svg
        width="10"
        height="222"
        viewBox="0 0 10 222"
        x={cx - 5} // Adjust position to center the circle properly
        y={cy - 5} // Adjust position to center the circle properly
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Line Path */}
        <path
          opacity="0.5"
          d="M5 28.3799V220.38"
          stroke={`url(#${color}_line)`}
          strokeWidth="2"
          strokeLinecap="round"
        />
  
        {/* Circle Path */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5 10C7.76142 10 10 7.76142 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10Z"
          fill={fill}
        />
  
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="red_line" x1="2" y1="128" x2="2" y2="1" gradientUnits="userSpaceOnUse">
            <stop stopColor="#111312" />
            <stop offset="1" stopColor="#ED0423" />
          </linearGradient>
          <linearGradient id="purple_line" x1="2" y1="128" x2="2" y2="1" gradientUnits="userSpaceOnUse">
            <stop stopColor="#111312" />
            <stop offset="1" stopColor="#6665DD" />
          </linearGradient>
        </defs>
      </svg>
    );
  };
  

const TeamCompareChart = () => {
  return (
    <div style={{background: "#111312", height: "300px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 20 }} data={team_compare}>
          <XAxis hide />
          <YAxis hide />
          <Scatter dataKey="a" shape={<CustomScatterShape fill="#ED0423" />}>
            {team_compare.map((entry, i) => (
              <Cell key={`cell-a-${i}`} fill="#ED0423" />
            ))}
          </Scatter>
          <Scatter dataKey="b" shape={<CustomScatterShape fill="#6665DD" />}>
            {team_compare.map((entry, i) => (
              <Cell key={`cell-b-${i}`} fill="#6665DD" />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TeamCompareChart;
