import React from "react";
import s from "./styles.module.css";

interface TagsProps {
  name: string;
  handleFilter: () => void;
  className: string;
}

export default function Tag({ name, handleFilter, className }: TagsProps) {
  return (
    <button className={className} onClick={handleFilter}>
      {name}
    </button>
  );
}
