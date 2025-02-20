import { useState } from "react";
import Input from "../Input/Input";

interface IComment {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  timeCreate: string;
  category: string;
}

export default function TaskWindow({
  deleteAllComments,
  addComment,
  value,
}: any) {
  const [value, setValue] = useState<string>("");

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="input-container">
      <Input value={value} handleChange={handleValueChange} />
      <div className="btns-container">
        <button onClick={addComment}>Add</button>
        <button onClick={deleteAllComments}>Delete All</button>
      </div>
    </div>
  );
}
