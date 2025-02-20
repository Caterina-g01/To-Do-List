import React from "react";

interface DropDownProps {
  categories: string[];
  selectedCategory: string;
  onChange: (category: string) => void;
}

const DropDown: React.FC<DropDownProps> = ({
  categories,
  selectedCategory,
  onChange,
}) => {
  return (
    <select
      className="categories-list"
      value={selectedCategory}
      onChange={(e) => onChange(e.target.value)}
    >
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default DropDown;
