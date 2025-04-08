import React, { useEffect, useState } from "react";
import "../index.css";

const Leaderboard = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/results")
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => b.wpm - a.wpm);
        setResults(sortedData);
      })
      .catch((err) => console.error("❌ Error fetching leaderboard:", err));
  }, []);

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Typing Test Leaderboard</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>WPM</th>
            <th>Accuracy</th>
            <th>Time Taken</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={result._id || index}>
              <td>{index + 1}</td>
              <td>{result.username}</td>
              <td>{result.wpm}</td>
              <td>{result.accuracy}%</td>
              <td>{result.timeTaken}s</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
