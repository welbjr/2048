import React, { useState } from "react";
import useBoard from "./hooks/useBoard";
import Board from "./components/Board";
import ToggleTheme from "./components/ToggleTheme";
import PreviousScores from "./components/PreviousScores";
import "./App.css";

const App = () => {
  // Foi criado um custom hook chamado useBoard
  // para manipular o estado do tabuleiro e
  // abstrair toda a lógica
  const { board, boardStatus } = useBoard();

  // Os temas são elementos css com classes
  // diferentes. Ex: `App${theme}` -> App__Light ou App__Dark
  const [theme, setTheme] = useState("__Light");

  return (
    <div className={`App${theme}`}>
      <div className="Header">
        <div className={`Score${theme}`}>Score: {boardStatus.score}</div>
        <ToggleTheme theme={theme} setTheme={setTheme} />
      </div>
      <Board board={board} boardStatus={boardStatus} />
      <PreviousScores theme={theme} />
    </div>
  );
};

export default App;
