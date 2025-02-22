import DropDown from "../ui/DropDown/DropDown";
import Button from "../Button/Button";
import { InputOnEdit } from "../InputOnEdit/InputOnEdit";

interface ITask {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  timeCreate: string;
  category: string;
  currentTitle: string;
}

interface TaskProps {
  task: ITask;
  categories: string[];
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
  onToggleCompleted: (id: number) => void;
  onChangeCategory: (id: number, category: string) => void;
  onCancel: (id: number) => void;
  isEditing: boolean;
  toggleEditMode: (id: number, currentTitle: string) => void;
}

export default function Task({
  task,
  categories,
  onDelete,
  onEdit,
  onToggleCompleted,
  onChangeCategory,
  onCancel,
  isEditing,
  toggleEditMode,
}: TaskProps) {
  return (
    <div className={`task ${task.completed ? "completed" : ""}`} key={task.id}>
      <div className="checkbox-container">
        <input
          onChange={() => onToggleCompleted(task.id)}
          className="checkbox"
          type="checkbox"
          checked={task.completed}
        />
      </div>

      <div className="task-header">
        <span className="task-time">{task.timeCreate}</span>
        <DropDown
          categories={categories}
          selectedCategory={task.category}
          onChange={(newCategory) => onChangeCategory(task.id, newCategory)}
        />
      </div>

      <InputOnEdit
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            toggleEditMode(task.id, task.currentTitle);
          }
        }}
        handleUpdate={(updateValue) => {
          onEdit(task.id, updateValue);
        }}
        editMode={isEditing}
        value={task.title}
        className="task-title"
        onClick={() => toggleEditMode(task.id, task.currentTitle)}
      />

      <div className="btns-container">
        {isEditing ? (
          <>
            <Button onClick={() => toggleEditMode(task.id, task.currentTitle)}>
              Save
            </Button>
            <Button onClick={() => onCancel(task.id)}>Cancel</Button>
          </>
        ) : (
          <>
            <Button onClick={() => toggleEditMode(task.id, task.currentTitle)}>
              Edit
            </Button>
            <Button onClick={() => onDelete(task.id)}>Delete</Button>
          </>
        )}
      </div>
    </div>
  );
}
