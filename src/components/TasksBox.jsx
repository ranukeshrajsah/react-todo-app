import { useState, useEffect, useRef } from "react";
import "./TasksBox.css";

export default function TasksBox({ selectedDate }) {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("open"); // open / completed
  const containerRef = useRef(null);

  // Persist tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([
      ...tasks,
      { text: input, date: selectedDate.toDateString(), status: "open" },
    ]);
    setInput("");
  };

  const updateTaskStatus = (index, status) => {
    const updated = [...tasks];
    updated[index].status = status;
    setTasks(updated);
  };

  const clearTasks = () => {
    const remainingTasks = tasks.filter(
      (task) =>
        task.date !== selectedDate.toDateString() ||
        task.status !== filter
    );
    setTasks(remainingTasks);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.date === selectedDate.toDateString() &&
      (filter === "open" ? task.status === "open" : task.status === "completed")
  );

  return (
    <div ref={containerRef} className="tasks-box">
      {/* Header */}
      <div className="tasks-header">
        <h2>Tasks for {selectedDate.toDateString()}</h2>
        <div className="tasks-controls">
          {["open", "completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`tab-btn ${filter === tab ? "active" : ""}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}

          {filteredTasks.length > 0 && (
            <button onClick={clearTasks} className="clear-btn">
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Input area */}
      {filter === "open" && (
        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button onClick={addTask}>Add</button>
        </div>
      )}

      {/* Task list */}
      <div className="tasks-list">
        {filteredTasks.length === 0 && (
          <p className="no-tasks">No {filter} tasks for this day</p>
        )}
        <ul>
          {filteredTasks.map((task, index) => (
            <li key={index} className={`task-item ${task.status}`}>
              <span className={task.status === "completed" ? "completed" : ""}>
                {task.text}
              </span>

              <div className="task-actions">
                {filter === "open" && (
                  <button
                    onClick={() => updateTaskStatus(index, "completed")}
                    className="action-btn complete"
                  >
                    ✔
                  </button>
                )}
                {filter === "completed" && (
                  <button
                    onClick={() => updateTaskStatus(index, "open")}
                    className="action-btn reopen"
                  >
                    ↩
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
