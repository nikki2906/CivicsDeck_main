import { useState } from "react";
import "../App.css";
import CARD_DATA from "../assets/data.jsx";
import AnswerForm from "./AnswerForm";

function Cards({ updateStreaks, resetStreak }) {
  const [currCard, setCurrCard] = useState(0);
  const [isFlipped, toggleFlip] = useState(false);
  const [correct, setCorrectness] = useState(true);
  const [randomOrder, setRandomOrder] = useState([0, ...getRandomArray(1, 10)]);
  const difficulty = CARD_DATA[currCard].difficulty;

  const handleNext = () => {
    setCorrectness(true);
    if (currCard < CARD_DATA.length-1) {
        setCurrCard(currCard + 1);
    }
    if (isFlipped) {
        toggleFlipDirection();
    }
  };

  const handlePrev = () => {
    setCorrectness(true);
    if (currCard > 0) {
        setCurrCard(currCard - 1);
    }
    if (isFlipped) {
        toggleFlipDirection();
    }
  };

  const handleRefresh = () => {
    setCurrCard(0);
    setCorrectness(true);
    if (isFlipped) {
        toggleFlipDirection();
    }
  };

  const toggleFlipDirection = () => {
    toggleFlip((isFlipped) => !isFlipped);
  };

  function getRandomArray(min, max) {
    const numbers = [];

    // Fill the array with numbers from min to max
    for (let i = min; i <= max; i++) {
      numbers.push(i);
    }

    // Shuffle the array to randomize the order
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]]; // Swap elements
    }

    return numbers;
  }

  const handleShuffle = () => {
    const newOrder = getRandomArray(0, CARD_DATA.length - 1);
    setRandomOrder(newOrder);
    setCurrCard(newOrder[0]);
  };

  return (
    <>
      <div className="cards-wrapper">
        <h2>Card {currCard + 1}</h2>
        <div className={`card-container ${difficulty}`} onClick={toggleFlipDirection}>
          <h1>
            {!isFlipped 
              ? `${CARD_DATA[currCard].question}`
              : `${CARD_DATA[currCard].answer}`
            }
          </h1>
        </div>
        <div className="button-container">
          <button onClick={handleRefresh} className="card-button"> ↺ </button>
          <button onClick={handlePrev} className="card-button"> ← </button>
          <button onClick={handleNext} className="card-button"> → </button>
          <button onClick={handleShuffle} className="card-button"> ⇋ </button>
        </div>
        <div className="btn-container">
          <AnswerForm
            correctAnswer={CARD_DATA[currCard].answer}
            updateStreaks={updateStreaks}
            resetStreak={resetStreak}
            correct={correct}
            setCorrectness={setCorrectness}
          />
        </div>
      </div>
    </>
  );
}

export default Cards;
