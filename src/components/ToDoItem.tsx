import calendar from "../assets/calendar.png";
import "../App.css";
import moment from "moment";
import { useState } from "react";
import trash from "../assets/Trash.svg";

export type TToDoItem = {
  id?: string;
  title?: string;
  description?: string;
  completed?: boolean;
  dueDate?: Date | null;
  category?: string;
  priority?: string;
};

interface TProps extends TToDoItem {
  tasks: TToDoItem[];
  setTasks: React.Dispatch<React.SetStateAction<TToDoItem[]>>;
}

export default function ToDoItem({
  id,
  title,
  description,
  completed,
  tasks,
  setTasks,
  dueDate,
  category,
  priority,
}: TProps) {
  const [isHovering, setIsHovering] = useState(false);

  function handleCompletion(id: string | undefined) {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTasks(newTasks);
  }

  function deleteItem(id: string | undefined) {
    const newTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTasks(newTasks);
  }

  return (
    <div
      className="list-container"
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      <button
        onClick={() => handleCompletion(id)}
        className={
          completed
            ? "completed-status-completed"
            : "completed-status-uncompleted"
        }
      />
      <div className="list-info">
        <h1
          className={
            completed ? "list-title strike list-title-completed" : "list-title"
          }
        >
          {title}
        </h1>
        {description && <p className="list-description">{description}</p>}
        <div className="tag-list">
          {dueDate && (
            <div className="due-date">
              <img src={calendar} alt="calendar" className="calendar-icon" />
              <p>{moment(dueDate).format("ddd DD")}</p>
            </div>
          )}
          {category && <div className="category-label">{category}</div>}
          {priority && (
            <div className={`priority-label-${priority.toLowerCase()}`}>
              {priority} priority
            </div>
          )}
        </div>
        {isHovering && (
          <button
            type="button"
            className="delete-button"
            onClick={() => deleteItem(id)}
          >
            <img src={trash} alt="trash" className="trash-icon" />
          </button>
        )}
      </div>
    </div>
  );
}
