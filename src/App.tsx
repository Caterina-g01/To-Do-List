import { useState } from "react";
import "./App.css";
import Input from "./components/Input/Input";
import { InputOnEdit } from "./components/InputOnEdit/InputOnEdit";

const categories = ["work", "shopping", "personal", "hobbies"];

interface IComment {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  timeCreate: string;
  category: string;
}

function App() {
  const [value, setValue] = useState<string>("");
  const [comments, setComments] = useState<IComment[] | null>(null);
  const [error, setError] = useState<string>("");
  const [editModeId, setEditModeId] = useState<number | null>(null);
  const handleValueChange = (newValue: string) => {
    setValue(newValue);
  };

  const addComment = () => {
    const newComment = {
      id: Math.random(),
      title: value,
      completed: false,
      timeCreate: new Date().toLocaleString(),
      category: categories[0],
    };
    if (value.length < 3) {
      setError("Title must be at least 3 characters long");
      return;
    }
    setComments([...(comments || []), newComment]);
    setValue("");
    setError("");
  };

  const deleteAllComments = () => {
    setComments([]);
  };

  const deleteComment = (id: number) => {
    setComments(
      (comments) => comments?.filter((comment) => comment.id !== id) || null
    );
    console.log("click");
  };

  const editComment = (id: number, newTitle: string) => {
    setComments(
      (comments) =>
        comments?.map((comment) =>
          comment.id === id ? { ...comment, title: newTitle } : comment
        ) || null
    );
  };

  function cancelEdit() {
    setEditModeId(null);
  }

  const toggleEditMode = (id: number) => {
    setEditModeId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="container">
      <h1 className="title">To-Do List</h1>
      <div className="inputTask-container">
        <div className="input-container">
          <Input value={value} handleChange={handleValueChange} />
        </div>
        <div className="btns-container">
          <button onClick={addComment}>Add</button>
          <button onClick={deleteAllComments}>Delete All</button>
        </div>
      </div>
      <div className="tasks-container">
        {comments?.map((comment) => {
          const isEditing = editModeId === comment.id;
          return (
            <div className="comment" key={comment.id}>
              <div className="checkbox-container">
                <input className="checkbox" type="checkbox" />
              </div>

              <div className="comment-header">
                <span className="comment-time">{comment.timeCreate}</span>

                <select className="categories-list">
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <InputOnEdit
                handleUpdate={(updateValue) => {
                  editComment(comment.id, updateValue);
                  setEditModeId(null);
                }}
                editMode={editModeId === comment.id}
                value={comment.title}
              />

              <div className="btns-container">
                {isEditing ? (
                  <>
                    <button onClick={() => setEditModeId(null)}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => toggleEditMode(comment.id)}>
                      Edit
                    </button>
                    <button onClick={() => deleteComment(comment.id)}>
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
        {error}
      </div>
    </div>
  );
}

export default App;

// декомпозиция, переименовать делит заменить на отмену
// эдит заменить отмену, справа от инпута сделать селект с выбором задач, чекбокс и время создания задачи, вёрстка
