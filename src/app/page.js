"use client";
import { useState } from "react";
import ShortUniqueId from "short-unique-id";
import "./index.css";

export default function Home() {
  const [state, setState] = useState("All");

  const [tasks, setTasks] = useState([]);
  const [inputValue, setInput] = useState("");

  const uid = new ShortUniqueId();

  const filteredTaskfirst = () => {
    setState("All");
  };

  const filteredTasksecond = () => {
    setState("Active");
  };

  const filteredTaskthird = () => {
    setState("Completed");
  };

  const handleinputvalue = (event) => {
    setInput(event.target.value);
  };

  const handlebutton = () => {
    const uidWithTimestamp = uid.stamp(32);
    setTasks([
      ...tasks,
      { task: inputValue, state: "Active", id: uidWithTimestamp },
    ]);
    setInput("");
  };

  console.log("this is tasks", tasks);

  const toggleTask = (id) => {
    console.log("this is id", id);
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            state: task.state === "Active" ? "Completed" : "Active",
          }
        : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const filteredTodos =
    state === "All" ? tasks : tasks.filter((task) => task.state === state);

  return (
    <div id="container">
      <div id="con">
        <div id="header-con">
          <div className="header">
            <div id="title">To-Do list</div>
            <div id="input-container">
              <input
                type="text"
                placeholder="Add a new task..."
                onChange={handleinputvalue}
                value={inputValue}
                onKeyDown={(e) => e.key === "Enter" && handleButton()}
              />
              <button onClick={handlebutton}>Add</button>
            </div>
            <div id="filter-container">
              <button
                className="butt"
                onClick={filteredTaskfirst}
                style={{
                  backgroundColor: state === "All" ? "#3574da" : "#f3f4f6",
                  color: state === "All" ? "white" : "black",
                }}
              >
                All
              </button>
              <button
                className="butt"
                onClick={filteredTasksecond}
                style={{
                  backgroundColor: state === "Active" ? "#3574da" : "#f3f4f6",
                  color: state === "Active" ? "white" : "black",
                }}
              >
                Active
              </button>
              <button
                className="butt"
                onClick={filteredTaskthird}
                style={{
                  backgroundColor:
                    state === "Completed" ? "#3574da" : "#f3f4f6",
                  color: state === "Completed" ? "white" : "black",
                }}
              >
                Completed
              </button>
            </div>
          </div>
          {filteredTodos.map((task) => (
            <div key={task.id} className="ul">
              <div className="li">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={task.state === "Completed"}
                  onChange={(e) => {
                    console.log("this is checkbox event", e);
                    toggleTask(task.id);
                  }}
                />
                <span
                  style={{
                    textDecoration:
                      task.state === "Completed" ? "line-through" : "none",
                    color: task.state === "Completed" ? "#999" : "#000",
                    marginLeft: "8px",
                  }}
                >
                  {task.task}
                </span>
              </div>

              {task.state === "Completed" && (
                <button
                  className="deletetask"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
          {tasks.length === 0 && (
            <div className="midlle">No tasks yet. Add one above!</div>
          )}
        </div>
        <div id="footer-con">
          Powered by <a href="">Pinecone academy</a>
        </div>
      </div>
    </div>
  );
}
