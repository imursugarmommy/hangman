import React from "react";

const Game = ({ customWordItem, listItem }) => {
  return (
    <>
      <ul className="guess-word">{customWordItem}</ul>
      <ul className="alphabet">{listItem}</ul>
      <div className="hangman"></div>
    </>
  );
};

export default Game;
