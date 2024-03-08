import { useState, useEffect } from "react";
import "./App.css";
import Game from "./Game.tsx";
import ChooseWord from "./ChooseWord.jsx";
import GameOver from "./GameOver.tsx";
import Win from "./Win.tsx";

const App = () => {
  const [gameStart, setGameStart] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);
  const [win, setWin] = useState(false);

  const [customWord, setCustomWord] = useState("");
  const [correctLetters, setCorrectLetters] = useState([]);
  const [clickedLetters, setClickedLetters] = useState([]);
  const [letterStyles, setLetterStyles] = useState({});
  const [lifes, setLifes] = useState(5);
  const [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
  });
  const [
    sortedAndFilteredCustomWordLetters,
    setSortedAndFilteredCustomWordLetters,
  ] = useState([]);

  useEffect(() => {
    setSortedAndFilteredCustomWordLetters(
      customWordInCharacters
        .slice()
        .sort()
        .filter((value, index, self) => self.indexOf(value) === index)
    );
  }, [gameStart]);

  useEffect(() => {
    if (timer.seconds === 60) {
      setTimer((prevTimer) => ({
        ...prevTimer,
        seconds: 0,
        minutes: prevTimer.minutes + 1,
      }));
    }
  }, [timer.seconds]);

  useEffect(() => {
    if (!gameStart) return;

    let timerInterval = setInterval(() => {
      setTimer((prevTimer) => ({
        ...prevTimer,
        seconds: prevTimer.seconds + 1,
      }));
    }, 1000);

    // ! funktioniert nicht
    if (!gameEnd) return;
    clearInterval(timerInterval);
  }, [gameEnd, gameStart]);

  const customWordInCharacters = customWord.toUpperCase().split("");

  const customWordItem = customWordInCharacters.map((character, index) => (
    <li
      key={index}
      style={{
        fontSize: customWord.length <= 14 ? 64 : 48 / customWord.length + 24,
        width:
          (customWord.length <= 14 ? 64 : 48 / customWord.length + 40) + 12,
        ...(letterStyles[character] || {}),
      }}>
      <span
        className="before"
        style={{
          backgroundColor: character === " " ? "rgba(0, 0, 0, 0)" : "black",
        }}></span>
      {character}
    </li>
  ));

  const alphabetArray = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode(97 + index)
  );
  const uppercaseAlphabetArray = alphabetArray.map((letter) =>
    letter.toUpperCase()
  );

  const listItem = uppercaseAlphabetArray.map((letter, index) => (
    <li
      key={index}
      onClick={() => checkLetter(letter)}
      className={
        clickedLetters.includes(letter) && correctLetters.includes(letter)
          ? "correct"
          : clickedLetters.includes(letter)
          ? "clicked"
          : ""
      }>
      {letter}
    </li>
  ));

  function checkLetter(letter) {
    setClickedLetters((prevClickedLetters) => [...prevClickedLetters, letter]);

    if (customWordInCharacters.includes(letter)) {
      setCorrectLetters((prevCorrectLetters) => [
        ...prevCorrectLetters,
        letter,
      ]);

      setLetterStyles((prevStyles) => ({
        ...prevStyles,
        [letter]: {
          color: "black",
        },
      }));
    } else {
      setLifes((prevLifes) => prevLifes - 1);

      if (lifes <= 0) {
        setLifes(0);
        setGameEnd(() => true);
      }
    }

    checkWinner();
  }

  useEffect(() => {
    checkWinner();
  }, [clickedLetters]);

  function checkWinner() {
    if (
      JSON.stringify(correctLetters.slice().sort()) ===
        JSON.stringify(sortedAndFilteredCustomWordLetters) &&
      gameStart
    ) {
      setWin(() => true);
    }
  }

  return (
    <div className="wrapper">
      <ChooseWord
        customWord={customWord}
        setCustomWord={setCustomWord}
        setGameStart={setGameStart}
      />
      <Game
        customWordItem={customWordItem}
        listItem={listItem}
        lifes={lifes}
      />
      {lifes === 0 && (
        <GameOver
          clickedLetters={clickedLetters}
          correctLetters={correctLetters}
          customWord={customWord}
          setGameEnd={setGameEnd}
          timer={timer}
        />
      )}
      {win === true && <Win />}
    </div>
  );
};

export default App;
