import React, { FC } from "react";
import { useState } from "react";
import Input from "../Input/Input";
interface InputOnEdit {
  value: string;
  editMode: boolean;
  handleUpdate: (value: string) => void;
}

export const InputOnEdit: FC<InputOnEdit> = (props) => {
  const { value, editMode, handleUpdate } = props;
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
    return <div>{value}</div>;
  }

  return <div>{renderContent()}</div>;
};
