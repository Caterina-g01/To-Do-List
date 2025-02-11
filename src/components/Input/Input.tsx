import { useState } from "react";
import s from "./style.module.css"

interface InputProps {
  // onValueChange: (newValue: string) => void;
  handleChange: (value: string) => void;
  value: string;
}

export default function Input(props: InputProps) {
  const {handleChange, value} = props;


  return (
    <div>
      <textarea className={s.input} onChange={(event) => handleChange(event.target.value)} value={value} />
    </div>
  );
}


// добавить возможность удаления всех постов, и каждого по-отдельности, кнопка редактирования для каждого поста