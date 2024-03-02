import { useState, useEffect } from "react";
import "./App.css";
import Game from "./Game.tsx";
import ChooseWord from "./ChooseWord.tsx";

const App = () => {
  const [customWord, setCustomWord] = useState("");
  const [correctLetters, setCorrectLetters] = useState([]);
  const [clickedLetters, setClickedLetters] = useState([]);
  const [letterStyles, setLetterStyles] = useState({});

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
    }
  }

  return (
    <div className="wrapper">
      <ChooseWord
        customWord={customWord}
        setCustomWord={setCustomWord}
      />
      <Game
        customWordItem={customWordItem}
        listItem={listItem}
      />
    </div>
  );
};

export default App;
