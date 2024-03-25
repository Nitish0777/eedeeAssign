import React, { useState, useEffect } from "react";
import axios from "axios";
import LogoutButton from "../Login/Logout";

const LeaderboardTab = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [selectedTimeWindow, setSelectedTimeWindow] = useState("5min");

  const fetchLeaderboardData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7000/api/leaderboard?timeWindow=${selectedTimeWindow}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data.leaderboard);
      setLeaderboardData(response.data.leaderboard); // Update state with leaderboard data
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, [selectedTimeWindow]);

  const handleTimeWindowChange = (timeWindow) => {
    setSelectedTimeWindow(timeWindow);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <LogoutButton />
      <div className="flex justify-center space-x-4">
        <button
          className={`${
            selectedTimeWindow === "5min"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } px-4 py-2 rounded-md`}
          onClick={() => handleTimeWindowChange("5min")}
        >
          5 minutes
        </button>
        <button
          className={`${
            selectedTimeWindow === "10min"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } px-4 py-2 rounded-md`}
          onClick={() => handleTimeWindowChange("10min")}
        >
          10 minutes
        </button>
        <button
          className={`${
            selectedTimeWindow === "30min"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } px-4 py-2 rounded-md`}
          onClick={() => handleTimeWindowChange("30min")}
        >
          30 minutes
        </button>
        <button
          className={`${
            selectedTimeWindow === "1hr"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } px-4 py-2 rounded-md`}
          onClick={() => handleTimeWindowChange("1hr")}
        >
          1 hour
        </button>
      </div>
      <div className="mt-4">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Points</th>
              <th className="px-4 py-2">Blue Triangles Clicked</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((entry, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{entry.name}</td>
                <td className="border px-4 py-2">{entry.points * 10}</td>
                <td className="border px-4 py-2">{entry.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTab;
