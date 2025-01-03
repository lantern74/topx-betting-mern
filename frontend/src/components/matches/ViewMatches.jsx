import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import useGetMatchData from '../../hooks/useGetMatchData';
import MatchResultFullCard from './widgets/MatchResultFullCard/index'
import './ViewMatches.css'

export default function Event() {
  const { t } = useTranslation();
  const { data: matches, isLoading, error } = useGetMatchData();
  const [selectedDate, setSelectedDate] = useState("all"); // Default to "All Matches"
  const navigate = useNavigate();

  
  const formatDateWithDay = (isoString) => {
    const [day, month, year] = isoString.split("/");
    const validDate = `${year}-${month}-${day}`; // Rearrange to ISO format
  
    const date = new Date(validDate);
  
    // Check for invalid date
    if (isNaN(date)) {
      console.error("Invalid date:", isoString);
      return { date: null, day: null };
    }
  
    // Format date part (dd/mm)
    const datePart = `${day}/${month}`;
  
    // Format weekday part (e.g., "六")
    const dayPart = new Intl.DateTimeFormat("zh-CN", {
      weekday: "narrow", // "narrow" returns one-character weekday, e.g., "六"
      timeZone: "Asia/Singapore",
    }).format(date);
  
    return { date: datePart, day: dayPart };
  };
  
  const formatDateOnly = (isoString) => {
    const date = new Date(isoString);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "Asia/Singapore",
    };
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  };

  const formatDayOnly = (isoString) => {
    const [day, month, year] = isoString.split("/");
    const validDate = `${year}-${month}-${day}`; // Rearrange to ISO format
  
    const date = new Date(validDate);
  
    const options = {
      weekday: "long", // Full weekday (e.g., "Friday")
      timeZone: "Asia/Singapore",
    };
  
    // Check for invalid date
    if (isNaN(date)) {
      console.error("Invalid date:", isoString);
      return "Invalid Date";
    }
  
    return new Intl.DateTimeFormat("zh-CN", options).format(date);
  };
  
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

  const groupMatchesByDate = (matches) => {
    if (!matches || !matches.length) return {}; // Handle empty or undefined input
  
    return matches.reduce((acc, match) => {
      const date = formatDateOnly(match.time);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(match);
      return acc;
    }, {});
  };
  

  const groupedMatches = matches ? groupMatchesByDate(matches) : {};

  const uniqueDates = ["all", ...Object.keys(groupedMatches)];

  const filteredMatches =
    selectedDate === "all" ? (matches || []) : (groupedMatches[selectedDate] || []);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className="loading-container">
          <div className="spinner"></div>
          <p style={{ marginTop: '10px' }}>{t("加載中...")}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div sx={{ textAlign: "center", marginTop: "20px" }}>
        <h6 color="error">
          {error}
        </h6>
      </div>
    );
  }

  return (
    <div style={{position:"relative"}}>
        <div className="match-container">
        {/* Date Tabs */}
        <div className="date-tabs">
            <div className="date-tabs-inner">
            {/* Render All Date Buttons */}
            {uniqueDates.map((date) => {
                const { date: formattedDate, day: dayPart } = date !== "all" ? formatDateWithDay(date) : {};
                return (
                <button
                    key={date}
                    className={`date-button ${selectedDate === date ? "selected" : ""}`}
                    onClick={() => setSelectedDate(date)}
                >
                    {date === "all" ? (
                    t("全部")
                    ) : (
                    <>
                        <div>{formattedDate}</div>
                        <div>({dayPart})</div>
                    </>
                    )}
                </button>
                );
            })}
            </div>
        </div>

        {/* Match List */}
        {selectedDate === "all" ? (
            // Render all matches grouped by date
            Object.keys(groupedMatches).map((date) => (
            <div key={date} className="match-group">
                <div className="match-group-header">
                {`${date} ${formatDayOnly(date)}`}
                </div>
                <ul className="match-list">
                {groupedMatches[date].map((match) => (
                    <li key={match.id} className="match-item">
                    <button
                        className="match-button"
                        onClick={() => navigate(`/match-result/${match.id}`)}
                    >
                        <MatchResultFullCard match={match} />
                    </button>
                    </li>
                ))}
                </ul>
            </div>
            ))
        ) : (
            // Render matches for the selected specific date
            <div>
            <ul className="match-list">
                {filteredMatches.map((match) => (
                <li key={match.id} className="match-item">
                    <button
                    className="match-button"
                    onClick={() => navigate(`/match-result/${match.id}`)}
                    >
                    <MatchResultFullCard match={match} />
                    </button>
                </li>
                ))}
            </ul>
            </div>
        )}
        </div>
    </div>
  );
}
