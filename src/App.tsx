import "./App.css";
import ToDoItem from "./components/ToDoItem";
import { TToDoItem } from "./components/ToDoItem";
import AddTask from "./components/AddTask";
import { useEffect, useState } from "react";
import moment from "moment";
import Timer from "./components/Timer";

function App() {
  const [tasks, setTasks] = useState<TToDoItem[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [isPomodoroOpen, setIsPomodoroOpen] = useState(false);

  useEffect(() => {
    const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(existingTasks);
  }, []);

  const uncompletedTasks = tasks.filter((task) => !task.completed);

  console.log(tasks);
  return (
    <>
      {isPomodoroOpen && <Timer setIsPomodoroOpen={setIsPomodoroOpen} />}
      <div className="main-card">
        <p
          className="pomodoro-text"
          onClick={() => setIsPomodoroOpen(!isPomodoroOpen)}
        >
          Try the Pomodoro Timer to complete your tasks more efficiently
        </p>
        <p className="today-date">{moment().format("ddd, MMM D")}</p>
        <div className="heading-container">
          <h1 className="heading">My Tasks</h1>
          <p className="tasks-left">
            {uncompletedTasks.length
              ? uncompletedTasks.length + " left"
              : "No tasks"}
          </p>
        </div>
        <div className="filter-container">
          <button
            className={selectedFilter === "all" ? "filter-active" : ""}
            type="button"
            onClick={() => setSelectedFilter("all")}
          >
            Inbox
          </button>
          <button
            className={selectedFilter === "active" ? "filter-active" : ""}
            type="button"
            onClick={() => setSelectedFilter("active")}
          >
            Active
          </button>
          <button
            className={selectedFilter === "completed" ? "filter-active" : ""}
            type="button"
            onClick={() => setSelectedFilter("completed")}
          >
            Completed
          </button>
        </div>

        <AddTask tasks={tasks} setTasks={setTasks} />
        {/* filter tasks based on filter */}
        {tasks
          ?.sort((a, b) => {
            if (a.dueDate && b.dueDate) {
              return (
                new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
              );
            }
            return 0;
          })
          .filter((task) => {
            if (selectedFilter === "all") {
              return true;
            }
            if (selectedFilter === "active") {
              return !task.completed;
            }
            if (selectedFilter === "completed") {
              return task.completed;
            }
            return true;
          })

          .map((task) => (
            <ToDoItem
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              completed={task.completed}
              tasks={tasks}
              setTasks={setTasks}
              dueDate={task.dueDate}
              category={task.category}
              priority={task.priority}
            />
          ))}
      </div>
    </>
  );
}

export default App;
