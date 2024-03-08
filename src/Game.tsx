import React from "react";

const Game = ({ customWordItem, listItem, lifes }) => {
  return (
    <>
      <p className="life-count">Lifes left: {lifes}</p>
      <ul className="guess-word">{customWordItem}</ul>
      <ul className="alphabet">{listItem}</ul>
      <div className="hangman"></div>
    </>
  );
};

export default Game;
