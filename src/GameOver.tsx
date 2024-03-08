import React, { useEffect, useState } from "react";

const GameOver = ({
  clickedLetters,
  correctLetters,
  customWord,
  setGameEnd,
  timer,
}) => {
  const [finalTime, setFinalTime] = useState({
    seconds: 0,
    minutes: 0,
  });

  useEffect(() => {
    setGameEnd(() => true);

    setFinalTime((prevTime) => ({
      ...prevTime,
      seconds: timer.seconds,
      minutes: timer.minutes,
    }));
  }, []);

  return (
    <div className="game-end">
      <div className="info-pannel">
        <div className="center">
          <h2>Game End!</h2>
          <p>
            The word was
            <span className="reveal">"{customWord.toUpperCase()}"</span>
          </p>
          <p>better luck next time...</p>
        </div>
        <div className="stats">
          <p>
            letters correct: <span>{correctLetters.length}</span>
          </p>
          <p>
            letters needed: <span>{customWord.length}</span>
          </p>
          <p>
            guesses taken: <span>{clickedLetters.length}</span>
          </p>
          <p>
            time taken:{" "}
            <span>
              {finalTime.minutes}:
              {finalTime.seconds < 10
                ? "0" + finalTime.seconds
                : finalTime.seconds}
              min
            </span>
          </p>
        </div>
        <div className="options">
          <button className="exit">Exit</button>
          <button className="restart">Restart</button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
