import React, { FC } from "react";
import { useState } from "react";
import Input from "../Input/Input";
interface InputOnEdit {
  value: string;
  editMode: boolean;
  handleUpdate: (value: string) => void;
  className: string;
}

export const InputOnEdit: FC<InputOnEdit> = (props) => {
  const { value, editMode, handleUpdate, className } = props;
  const [editValue, setEditValue] = useState<string>(value);

  const handleValueChange = (value: string) => {
    setEditValue(value);
  };

  function renderContent() {
    if (editMode) {
      return (
        <Input
          handleBlur={() => handleUpdate(editValue)}
          value={editValue}
          handleChange={handleValueChange}
        />
      );
    }
    return <div className={className}>{value}</div>;
  }

  return <div>{renderContent()}</div>;
};
