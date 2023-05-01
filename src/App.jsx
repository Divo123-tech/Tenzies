import Dice from "./components/Dice";
import "./App.css";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";

function App() {
  const [dice, setNewDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  function generateDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateDie());
    }
    return newDice;
  }
  const rollDice = () => {
    setNewDice((prevDie) => {
      return prevDie.map((die) => {
        return die.isHeld ? die : generateDie();
      });
    });
  };
  const resetGame = () => {
    setNewDice(allNewDice);
    setTenzies(false);
  };
  const holdDice = (id) => {
    setNewDice((prevDie) => {
      return prevDie.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      );
    });
  };

  useEffect(() => {
    let firstDice = dice[0].value;
    let sameDieArray = dice.filter(
      (die) => die.isHeld && die.value === firstDice
    );
    if (sameDieArray.length === 10) {
      setTenzies(true);
    }
  }, [dice]);

  const allDice = dice.map((die) => (
    <Dice
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      toggle={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && (
        <Confetti width={2000} height={650} confettiSource={{ x: 800, y: 0 }} />
      )}
      <h1 className="title">Tenzies</h1>
      <div className="inst-container">
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>
      <div className="dice-container">{allDice}</div>
      <button className="roll" onClick={tenzies ? resetGame : rollDice}>
        {tenzies ? "Reset" : "Roll"}
      </button>
    </main>
  );
}

export default App;
