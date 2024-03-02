import React, { useState } from "react";

const ChooseWord = ({ customWord, setCustomWord }) => {
  const [visibility, setVisibility] = useState("block");
  const [input, setInput] = useState("");

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      CheckInput();
    }
  });

  function CheckInput() {
    if (customWord === "") {
      setVisibility("block");
    } else {
      setVisibility("none");
    }
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
                  setCustomWord(inputValue);
                  if (inputValue.length <= 20) {
                    setInput(inputValue);
                  }
                }}
              />
              <div className="absolute">
                <label htmlFor="input">{input.length}/20</label>
                <i className="fa-solid fa-shuffle"></i>
              </div>
            </div>
            <button
              className="submit"
              onClick={() => CheckInput()}>
              Submit
            </button>
          </div>
        </div>
        <div className="choose">
          <h4>Or choose from below</h4>
          <div className="words">
            <div className="word">placeholder</div>
            <div className="word">hold</div>
            <div className="word">mineseeker</div>
            <div className="word">placeholder</div>
            <div className="word">hurensohn</div>
            <div className="word">have</div>
            <div className="word">apple</div>
            <div className="word">placeholder</div>
            <div className="word">placeholder</div>
            <div className="word">placeholder</div>
            <div className="word">place</div>
            <div className="word">placeholder</div>
            <div className="word">placeholder</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseWord;
