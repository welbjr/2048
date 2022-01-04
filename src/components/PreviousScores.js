/**
 * Esse componente renderiza uma tabela
 * com os scores salvos no localStorage como
 * key: date, value: score
 */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";

const variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
  pulse: {
    scale: 0.9,
    transition: {
      duration: 0.2,
    },
  },
  hover: {
    scale: 1.05,
  },
};

const PreviousScores = ({ theme }) => {
  const [showTable, setShowTable] = useState(false);

  const onClickHandler = () => {
    setShowTable(!showTable);
  };

  const renderRows = () => {
    return Object.keys(localStorage).map((el, i) => (
      <tr
        className={i % 2 === 0 ? "Row__Light" : "Row__Dark"}
        key={`${el}:${localStorage[el]}`}
      >
        <td key={`Date, ${el}:${localStorage[el]}`}>{el}</td>
        <td key={`Score, ${el}:${localStorage[el]}`}>{localStorage[el]}</td>
      </tr>
    ));
  };

  return (
    <div className="Table">
      <motion.h3
        className={`Table__Score${theme}`}
        onClick={onClickHandler}
        variants={variants}
        whileTap={"pulse"}
        whileHover={"hover"}
      >
        {showTable ? <MdKeyboardArrowRight /> : <MdKeyboardArrowDown />}
        Scores
      </motion.h3>
      <motion.table
        variants={variants}
        initial={"hidden"}
        animate={showTable ? "show" : "hidden"}
      >
        <thead>
          <tr className="Row__Dark">
            <th>Date</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </motion.table>
    </div>
  );
};

export default PreviousScores;
