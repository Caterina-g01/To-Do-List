import React, { FC } from "react";
import { useState } from "react";
import Input from "../Input/Input";
interface InputOnEdit {
  value: string;
  editMode: boolean;
  handleUpdate: (value: string) => void;
  className: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick?: () => void;
}

export const InputOnEdit: FC<InputOnEdit> = (props) => {
  const { value, editMode, handleUpdate, className, onKeyDown, onClick } =
    props;
  const [editValue, setEditValue] = useState<string>(value);

  const handleValueChange = (value: string) => {
    setEditValue(value);
  };

  function renderContent() {
    if (editMode) {
      return (
        <Input
          onKeyDown={onKeyDown}
          handleBlur={() => handleUpdate(editValue)}
          value={editValue}
          handleChange={handleValueChange}
        />
      );
    }
    return (
      <div onClick={onClick} className={className}>
        {value}
      </div>
    );
  }

  return <div>{renderContent()}</div>;
};
