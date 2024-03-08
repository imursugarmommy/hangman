import React, { useEffect, useState } from "react";

const ChooseWord = ({ customWord, setCustomWord, setGameStart }) => {
  const [randomWord, setRandomWord] = useState("");

  async function getWord() {
    try {
      const wordData = await fetch(
        "https://random-word-api.herokuapp.com/word",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      const wordObj = await wordData.json();
      setRandomWord(() => wordObj[0]);
    } catch (error) {
      console.error("Error fetching word:", error);
      throw error;
    }
  }

  const [randomWordsArray, setRandomWordsArray] = useState([]);

  async function getWordsArray() {
    try {
      const response = await fetch(
        "https://random-word-api.herokuapp.com/word?number=52",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      const wordsArray = await response.json();
      setRandomWordsArray(wordsArray);
    } catch (error) {
      console.error("Error fetching words:", error);
      throw error;
    }
  }

  useEffect(() => {
    getWord();
    getWordsArray();
  }, []);

  const randomWordItem = randomWordsArray.map((randomWord, index) => (
    <div
      className="word"
      key={index}
      onClick={(e) => handleClick(e.target.textContent)}>
      {randomWord}
    </div>
  ));

  const [visibility, setVisibility] = useState("block");
  const [input, setInput] = useState("");

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      CheckInput();
    }
  });

  function handleClick(word) {
    getWord();

    setCustomWord(word);
    setInput(word);
  }

  function CheckInput() {
    if (customWord === "") {
      setVisibility("block");
    } else {
      setVisibility("none");
    }

    gameStart();
  }

  function gameStart() {
    // ? gamestart() startet einen timer, er muss jedoch wenn gameEnd === true ist stoppen,
    // ?  oder zumindestens wenn restart gedrueckt wird
    // ! maybe einfach laufen lassen und auf gameStart() einfach nur zuruecksetzen

    // * in Game over neue variabel erstellt welche die zeit speichert, clearInterval funktioniert trotzdem noch nicht

    setGameStart(() => true);
  }

  return (
    <div
      className="overlay"
      style={{ display: visibility }}>
      <div className="content">
        <div className="custom">
          <h2>Custom Word</h2>
          <div className="input-group">
            <div className="wrap">
              <input
                type="text"
                className="input"
                placeholder="Your Word"
                value={input}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setCustomWord(() => inputValue);
                  if (inputValue.length <= 20) {
                    setInput(inputValue);
                  }
                }}
              />
              <div className="absolute">
                <label htmlFor="input">{input.length}/20</label>
                <i
                  className="fa-solid fa-shuffle"
                  onClick={() => handleClick(randomWord)}></i>
              </div>
            </div>
            <button
              className="submit"
              onClick={CheckInput}>
              Submit
            </button>
          </div>
        </div>
        <div className="choose">
          <h4>Or choose from below</h4>
          <div className="words">{randomWordItem}</div>
        </div>
      </div>
    </div>
  );
};

export default ChooseWord;
