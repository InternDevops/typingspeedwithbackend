import React, { useState, useEffect } from "react";
import "../index.css";

// Array of sample paragraphs
const paragraphs = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing is a skill that improves with practice and patience.",
  "React is a powerful library for building user interfaces efficiently.",
  "Consistency is the key to mastering any new ability.",
  "Focus and clarity lead to better performance and fewer mistakes.",
  "Code is like poetry — both require creativity and precision.",
  "Short sentences make typing tests easier and quicker to complete.",
  "Always challenge yourself to type faster and more accurately.",
  "A smooth sea never made a skilled sailor.",
  "Learning to type quickly boosts productivity in all tasks."
];

const getRandomParagraph = () => {
  const randomIndex = Math.floor(Math.random() * paragraphs.length);
  return paragraphs[randomIndex];
};

const TypingSpeedTest = () => {
  const [textToType, setTextToType] = useState(getRandomParagraph());
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleChange = (e) => {
    if (!isRunning) {
      setStartTime(new Date());
      setIsRunning(true);
    }

    const value = e.target.value;
    setUserInput(value);

    if (value === textToType) {
      setIsRunning(false);
      setIsCompleted(true);
    }
  };

  useEffect(() => {
    if (isRunning && userInput.length > 0) {
      const wordsTyped = userInput.trim().split(/\s+/).length;
      const elapsedTime = (new Date() - startTime) / 60000;
      setWpm(elapsedTime > 0 ? Math.round(wordsTyped / elapsedTime) : 0);

      const correctChars = userInput.split("").filter((char, index) => char === textToType[index]).length;
      setAccuracy(Math.round((correctChars / textToType.length) * 100));
    }
  }, [userInput, isRunning]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }

    if ((timeLeft === 0 || isCompleted) && !hasSubmitted) {
      setIsRunning(false);
      setIsCompleted(true);
      setHasSubmitted(true);
      submitResult();
    }
  }, [timeLeft, isRunning, isCompleted]);

  const submitResult = () => {
    const username = prompt("Enter your name to save result:");
    if (!username) return;

    const resultData = {
      username,
      wpm,
      accuracy,
      timeTaken: 30 - timeLeft,
    };

    fetch("http://localhost:5000/api/results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resultData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Result saved:", data);
      })
      .catch((err) => {
        console.error("❌ Error saving result:", err);
      });
  };

  const resetTest = () => {
    setTextToType(getRandomParagraph()); // 🎯 Pick new paragraph
    setUserInput("");
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setTimeLeft(30);
    setIsRunning(false);
    setIsCompleted(false);
    setHasSubmitted(false);
  };

  return (
    <div className="typing-container">
      <h1 className="title">Typing Speed Test</h1>
      <div className="text-to-type">
        {textToType.split("").map((char, index) => {
          let className = "";
          if (index < userInput.length) {
            className = userInput[index] === char ? "correct" : "incorrect";
          }
          return (
            <span key={index} className={className}>
              {char}
            </span>
          );
        })}
      </div>

      <textarea
        className="text-area"
        placeholder="Start typing here..."
        value={userInput}
        onChange={handleChange}
        disabled={isCompleted}
      />

      <div className="stats">
        <p>Words per Minute: <strong>{wpm}</strong></p>
        <p>Accuracy: <strong>{accuracy}%</strong></p>
        <p>Time Left: <strong>{timeLeft}s</strong></p>
        {isCompleted && <p className="completed-msg">✅ Test Completed!</p>}
      </div>

      <button className="reset-btn" onClick={resetTest}>Reset Test</button>
    </div>
  );
};

export default TypingSpeedTest;
