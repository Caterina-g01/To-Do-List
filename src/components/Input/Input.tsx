import { useState } from "react";
import s from "./style.module.css";

interface InputProps {
  // onValueChange: (newValue: string) => void;
  handleChange: (value: string) => void;
  value: string;
  handleBlur?: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function Input(props: InputProps) {
  const { handleChange, value, handleBlur, onKeyDown } = props;

  return (
    <div>
      <input
        className={s.input}
        onChange={(event) => handleChange(event.target.value)}
        value={value}
        onBlur={handleBlur}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
