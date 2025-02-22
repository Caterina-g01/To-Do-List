import { useEffect, useState } from "react";
import "./App.css";
import Input from "./components/Input/Input";
import Tag from "./components/ui/Tag/Tag";
import Button from "./components/Button/Button";
import Task from "./components/Task/Task";

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
  currentTitle: string;
}

function App() {
  const [value, setValue] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[] | null>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [error, setError] = useState<string>("");
  const [editModeId, setEditModeId] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const selectedCategory = categories[0];
  const [previousValues, setPreviousValues] = useState<{
    [key: number]: string;
  }>({});

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
      currentTitle: value,
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

  const toggleEditMode = (id: number, currentTitle: string) => {
    setPreviousValues((prev) => ({ ...prev, [id]: currentTitle }));
    setEditModeId((prevId) => (prevId === id ? null : id));
  };

  function cancelEdit(id: number) {
    setTasks(
      (tasks) =>
        tasks?.map((task) =>
          task.id === id
            ? { ...task, title: previousValues[id] || task.title }
            : task
        ) || null
    );

    setEditModeId(null);
  }

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

  const changeCategory = (id: number, newCategory: string) => {
    setTasks((prev) =>
      prev
        ? prev.map((task) =>
            task.id === id ? { ...task, category: newCategory } : task
          )
        : null
    );
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="container">
      <h1 className="title">To-Do List</h1>
      <div className="inputTask-container">
        <h2 className="inputTask-title">Enter your task's name</h2>
        <div className="input-container">
          <Input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
                console.log("кнопка нажата");
              }
            }}
            value={value}
            handleChange={handleValueChange}
          />
        </div>
        <div className="btns-container">
          <Button onClick={addTask}>Add</Button>
          <Button onClick={deleteAllTasks}>Delete All</Button>
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
        <h2 className="tasks-title">Tasks</h2>
        {filteredTasks?.map((task) => (
          <Task
            key={task.id}
            task={task}
            categories={categories}
            onDelete={deleteTask}
            onEdit={editTask}
            onToggleCompleted={toggleCompleted}
            onChangeCategory={changeCategory}
            isEditing={editModeId === task.id}
            toggleEditMode={toggleEditMode}
            onCancel={cancelEdit}
          />
        ))}
        {error}
      </div>
    </div>
  );
}

export default App;

//  отмена

// сохранение состояния
