import React from "react";
import s from "./styles.module.css";

interface TagsProps {
  name: string;
  handleFilter: () => void;
}

export default function Tag({ name, handleFilter }: TagsProps) {
  return (
    <button className={s.tag} onClick={handleFilter}>
      {name}
    </button>
  );
}
