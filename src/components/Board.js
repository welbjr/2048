/**
 * Renderiza o tabuleiro voltado pelo useBoard
 */
import React from "react";
import { motion } from "framer-motion";
import Number from "./Number";

const Board = ({ board, boardStatus }) => {
  const animationVariants = {
    spawn: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 0.2,
      },
    },
  };

  const renderBoard = (board) => {
    return (
      <div className="Board">
        {board.map((row, i) => (
          <div className="Row" key={i}>
            {row.map((el, j) => (
              <motion.div
                key={`${i},${j}`}
                variants={animationVariants}
                animate={el > 0 ? "spawn" : ""}
              >
                <Number number={el} status={boardStatus.status} />
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return <>{renderBoard(board)}</>;
};

export default Board;
