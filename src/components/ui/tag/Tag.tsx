import React from "react";

interface TagsProps {
  name: string;
  handleFilter: () => void;
}

export default function Tag({ name, handleFilter }: TagsProps) {
  return <button onClick={handleFilter}>{name}</button>;
}
