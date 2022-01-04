import React from "react";
import randomColor from "random-color";

// A técnica de memoization é utilizada para se lembrar das cores dos números
let memoColors = { type: "playing", 0: "#1f1f1f" };
const colorSaturations = {
  playing: [0.5, 0.9],
  lost: [0.1, 0.6],
};

const Number = ({ number, status }) => {
  // Se o jogo estiver perdido, a paleta de cores é mudada
  // para outra mais acinzentada,
  // e as cores anteriores excluidas
  if (status === "lost" && memoColors.type !== "lost") {
    memoColors = { type: "lost" };
  }

  // Se o número não está no objeto memoColors, ele será inserido (como key)
  // junto com uma cor aleatória (como value)
  if (!memoColors[number])
    memoColors[number] = randomColor(...colorSaturations[status]).hexString();

  return (
    <div className={`Number`} style={{ backgroundColor: memoColors[number] }}>
      {number}
    </div>
  );
};

export default Number;
