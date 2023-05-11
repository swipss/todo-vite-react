import { useState } from "react";
import plus from "../assets/plus.png";
import { TToDoItem } from "./ToDoItem";
import { v4 as uuid } from "uuid";
import Datepicker from "./Datepicker";

const taskCategories = ["Work", "Personal", "Shopping", "Home", "Other"];
const priorities = ["High", "Medium", "Low"];

export default function AddTask({
  tasks,
  setTasks,
}: {
  tasks: TToDoItem[];
  setTasks: React.Dispatch<React.SetStateAction<TToDoItem[]>>;
}) {
  const [isAddingNewTask, setIsAddingNewTask] = useState(false);
  const [newTask, setNewTask] = useState<TToDoItem>();
  const [startDate, setStartDate] = useState<Date | null | undefined>();
  const [isAddingDate, setIsAddingDate] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingPriority, setIsAddingPriority] = useState(false);

  function handleAddTask() {
    const task = {
      ...newTask,
      completed: false,
      id: uuid(),
      dueDate: startDate ?? null,
    };
    const newTasks = [...tasks, task];
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTasks(newTasks);
    setIsAddingNewTask(false);
    setNewTask({});
    setStartDate(null);
  }

  return (
    <>
      {!isAddingNewTask ? (
        <div
          className="add-task"
          onClick={() => setIsAddingNewTask(!isAddingNewTask)}
        >
          <img src={plus} alt="plus" className="plus-icon" />
          <p className="add-task-text">Add Task</p>
        </div>
      ) : (
        <form className="new-task-container" onSubmit={() => handleAddTask()}>
          <input
            type="text"
            placeholder="Task name"
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            value={newTask?.title}
            className="task-name"
            name="title"
            autoFocus
            required
          />
          <input
            type="text"
            placeholder="Description"
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            value={newTask?.description}
            name="description"
            className="task-description"
          />
          <div className="tags">
            <Datepicker
              startDate={startDate}
              setStartDate={setStartDate}
              isAddingDate={isAddingDate}
              setIsAddingDate={setIsAddingDate}
            />
            <div
              style={{
                position: "relative",
              }}
            >
              <div
                className="datepicker-dropdown-button"
                onClick={() => setIsAddingCategory(!isAddingCategory)}
                style={{
                  color: newTask?.category && "#4f46e5",
                }}
              >
                {newTask?.category || "Category"}
                {newTask?.category && (
                  <button
                    type="button"
                    className="clear-button"
                    onClick={() => setNewTask({ ...newTask, category: "" })}
                  >
                    x
                  </button>
                )}
              </div>
              {isAddingCategory && (
                <div className="datepicker-dropdown">
                  {taskCategories.map((category) => (
                    <div
                      className="category-dropdown-item"
                      onClick={() => {
                        setNewTask({ ...newTask, category: category });
                        setIsAddingCategory(false);
                      }}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div
              style={{
                position: "relative",
              }}
            >
              <div
                className="datepicker-dropdown-button"
                onClick={() => setIsAddingPriority(!isAddingPriority)}
                style={{
                  color: newTask?.priority && "#4f46e5",
                }}
              >
                {newTask?.priority
                  ? newTask?.priority + " priority"
                  : "Priority"}
                {newTask?.priority && (
                  <button
                    type="button"
                    className="clear-button"
                    onClick={() => setNewTask({ ...newTask, priority: "" })}
                  >
                    x
                  </button>
                )}
              </div>
              {isAddingPriority && (
                <div className="datepicker-dropdown">
                  {priorities.map((priority) => (
                    <div
                      className="category-dropdown-item"
                      onClick={() => {
                        setNewTask({ ...newTask, priority: priority });
                        setIsAddingPriority(false);
                      }}
                    >
                      {priority} priority
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="buttons-container">
            <button
              type="button"
              className="cancel-button"
              onClick={() => {
                setIsAddingNewTask(false);
                setStartDate(null);
              }}
            >
              Cancel
            </button>
            <button
              disabled={!newTask?.title}
              className="add-button"
              type="submit"
            >
              Add task
            </button>
          </div>
        </form>
      )}
    </>
  );
}
