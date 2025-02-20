import { useState } from "react";
import "./App.css";
import Input from "./components/Input/Input";
import { InputOnEdit } from "./components/InputOnEdit/InputOnEdit";
import Tag from "./components/ui/tag/Tag";
import DropDown from "./components/ui/dropDown/DropDown";

const categories = ["work", "shopping", "personal", "study"];
const filterCategories = [
  "completed",
  "not completed",
  "shopping",
  "personal",
  "work",
  "study",
  "all",
];

interface ITask {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  timeCreate: string;
  category: string;
}

function App() {
  const [value, setValue] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[] | null>(null);
  const [error, setError] = useState<string>("");
  const [editModeId, setEditModeId] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
  };

  const addTask = () => {
    const newTask = {
      id: Math.random(),
      title: value,
      completed: false,
      timeCreate:
        new Date().toLocaleDateString("en-GB") +
        " " +
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      category: selectedCategory,
    };
    if (value.length < 3) {
      setError("Title must be at least 3 characters long");
      return;
    }
    setTasks([...(tasks || []), newTask]);
    setValue("");
    setError("");
  };

  const deleteAllTasks = () => {
    setTasks([]);
  };

  const deleteTask = (id: number) => {
    setTasks((tasks) => tasks?.filter((task) => task.id !== id) || null);
    console.log("click");
  };

  const editTask = (id: number, newTitle: string) => {
    setTasks(
      (tasks) =>
        tasks?.map((task) =>
          task.id === id ? { ...task, title: newTitle } : task
        ) || null
    );
  };

  function cancelEdit() {
    setEditModeId(null);
  }

  const toggleEditMode = (id: number) => {
    setEditModeId((prevId) => (prevId === id ? null : id));
  };

  const toggleCompleted = (id: number) => {
    setTasks(
      (tasks) =>
        tasks?.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        ) || null
    );
  };

  const filteredTasks = tasks?.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "not completed") return !task.completed;
    return task.category === filter;
  });

  const handleFilterChange = (category: string) => {
    setFilter(category);
  };

  return (
    <div className="container">
      <h1 className="title">To-Do List</h1>
      <div className="inputTask-container">
        <div className="input-container">
          <Input value={value} handleChange={handleValueChange} />
        </div>
        <div className="btns-container">
          <button onClick={addTask}>Add</button>
          <button onClick={deleteAllTasks}>Delete All</button>
        </div>
      </div>
      <div className="tags-container">
        {filterCategories.map((category) => (
          <Tag
            handleFilter={() => handleFilterChange(category)}
            key={category}
            name={category}
          />
        ))}
      </div>
      <div className="tasks-container">
        <h2 className="tasks-title">TASKS</h2>
        {filteredTasks?.map((task) => {
          const isEditing = editModeId === task.id;
          return (
            <div
              className={`task ${task.completed ? "completed" : ""}`}
              key={task.id}
            >
              <div className="checkbox-container">
                <input
                  onChange={() => toggleCompleted(task.id)}
                  className="checkbox"
                  type="checkbox"
                  checked={task.completed} //атрибут, который используется в элементе <input> с типом checkbox. Он указывает, будет ли галочка в чекбоксе стоять (отмечена) или нет.
                />
              </div>

              <div className="task-header">
                <span className="task-time">{task.timeCreate}</span>
                <DropDown
                  categories={categories}
                  selectedCategory={task.category}
                  onChange={(newCategory) => {
                    setTasks((prevTasks) => {
                      if (!prevTasks) return [];
                      return prevTasks.map((t) => {
                        if (t.id === task.id) {
                          return { ...t, category: newCategory };
                        }
                        return t;
                      });
                    });
                  }}
                />
              </div>

              <InputOnEdit
                handleUpdate={(updateValue) => {
                  editTask(task.id, updateValue);
                  setEditModeId(null);
                }}
                editMode={editModeId === task.id}
                value={task.title}
                className="task-title"
              />

              <div className="btns-container">
                {isEditing ? (
                  <>
                    <button onClick={() => setEditModeId(null)}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => toggleEditMode(task.id)}>
                      Edit
                    </button>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
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
