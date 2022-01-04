/**
 * Hook customizado para lidar com o estado do tabuleiro.
 * As funções que manipulam o tabuleiro podem ser encontradas
 * em src/utils/helpers.js
 */
import { useState, useEffect } from "react";
import {
  createBoard,
  mutateBoard,
  calculatePoints,
  isLost,
} from "../utils/helpers";

const useBoard = () => {
  const [boardStatus, setBoardStatus] = useState({
    status: "playing",
    direction: "",
    size: 4,
    score: 1,
  });
  const [board, setBoard] = useState(createBoard(boardStatus.size));

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  });

  const keyDownHandler = ({ key }) => {
    let newBoard = [...board];
    let newBoardStatus = { ...boardStatus };

    if (key === "ArrowUp") {
      newBoard = mutateBoard(newBoard, "up");
      newBoardStatus.direction = "up";
    }
    if (key === "ArrowDown") {
      newBoard = mutateBoard(newBoard, "down");
      newBoardStatus.direction = "down";
    }
    if (key === "ArrowLeft") {
      newBoard = mutateBoard(newBoard, "left");
      newBoardStatus.direction = "left";
    }
    if (key === "ArrowRight") {
      newBoard = mutateBoard(newBoard, "right");
      newBoardStatus.direction = "right";
    }

    const score = calculatePoints(newBoard);
    newBoardStatus.score = score;

    if (isLost(newBoard)) {
      newBoardStatus.status = "lost";

      // Guarda o horário que o jogador perdeu na variável today,
      // no formato "dd/YY,hh:mm"
      const today = `${String(new Date().getDay()).padStart(
        2,
        "0"
      )}/${new Date().getUTCDate()}, ${new Date().getHours()}:${String(
        new Date().getMinutes()
      ).padStart(2, "0")}`;

      // Salva o dia e o score nos cookies do usuário
      localStorage.setItem(today, score);
    }

    setBoardStatus(newBoardStatus);
    setBoard(newBoard);
  };

  return { board, setBoard, boardStatus, setBoardStatus };
};

export default useBoard;
