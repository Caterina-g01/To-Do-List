import React from "react";
import s from "./styles.module.css";

interface IButton {
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<IButton> = ({ onClick, children }) => {
  return (
    <button className={s.btn} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
