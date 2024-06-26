// GamePage.js
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { Howl } from "howler";
import axios from "axios";
import LogoutButton from "../Login/Logout";

const GamePage = () => {
  const [shapes, setShapes] = useState([]);
  const [score, setScore] = useState(0);
  const [saveStatus, setSaveStatus] = useState({ success: false, message: "" });

  const playSound = () => {
    const sound = new Howl({
      src: ["beep.mp3"],
    });
    sound.play();
  };

  const handleShapeClick = (shape) => {
    if (shape.color === "blue" && shape.type === "triangle") {
      setScore(score + 10);
      saveScoreToDatabase(); // Save score to the database
    } else {
      playSound();
    }
  };

  const saveScoreToDatabase = async () => {
    try {
      const response = await axios.post(
        "http://localhost:7000/api/scores",
        {
          score: score + 10,
          shapeType: "triangle",
          shapeColor: "blue",
        },
        {
          withCredentials: true, // Send cookies with the request
        }
      );
      console.log(response);
      setSaveStatus({ success: true, message: "Score saved successfully" });
    } catch (error) {
      console.error("Error saving score:", error);
      setSaveStatus({ success: false, message: "Error saving score" });
    }
  };

  useEffect(() => {
    const generateShapes = () => {
      const newShapes = [];
      const colors = ["red", "yellow", "blue", "orange"];
      const types = ["square", "circle", "triangle"];
      const numShapes = Math.floor(Math.random() * 11) + 5; // Random between 5 and 15

      for (let i = 0; i < numShapes; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const type = types[Math.floor(Math.random() * types.length)];
        newShapes.push({ color, type });
      }

      setShapes(newShapes);
    };

    generateShapes();
    const interval = setInterval(generateShapes, 60000); // Refresh shapes every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LogoutButton />
      <div className="grid grid-cols-5 gap-4">
        {shapes.map((shape, index) => (
          <div
            key={index}
            className={`w-16 h-16 flex items-center justify-center rounded-full bg-${shape.color}-500`}
            onClick={() => handleShapeClick(shape)}
          >
            {shape.type === "square" && (
              <div className="w-10 h-10 bg-white"></div>
            )}
            {shape.type === "circle" && (
              <div className="w-10 h-10 rounded-full bg-white"></div>
            )}
            {shape.type === "triangle" && (
              <div className="w-0 h-0 border-t-5 border-r-5 border-white"></div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 text-lg font-bold">Score: {score}</div>
      {saveStatus.success && <Confetti />}
      {saveStatus.message && <div>{saveStatus.message}</div>}
    </div>
  );
};

export default GamePage;
