/**
 * Ícone para mudar o tema
 */
import React from "react";
import { motion } from "framer-motion";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const ToggleTheme = ({ theme, setTheme }) => {
  const oppositeTheme = theme === "__Light" ? "__Dark" : "__Light";

  const onClickHandler = () => {
    setTheme(oppositeTheme);
  };

  return (
    <motion.button
      className="ToggleTheme"
      onClick={onClickHandler}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {theme === "__Light" ? (
        <MdLightMode className={`ToggleTheme__Icon${theme}`} />
      ) : (
        <MdDarkMode className={`ToggleTheme__Icon${theme}`} />
      )}
    </motion.button>
  );
};

export default ToggleTheme;
