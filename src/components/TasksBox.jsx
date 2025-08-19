import { useState, useEffect, useRef } from "react";

export default function TasksBox({ selectedDate }) {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("open"); // open / completed / archived
  const containerRef = useRef(null);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add new task
  const addTask = () => {
    if (!input.trim()) return;
    setTasks([
      ...tasks,
      { text: input, date: selectedDate.toDateString(), status: "open" },
    ]);
    setInput("");
  };

  // Update task status (completed / archived / open)
  const updateTaskStatus = (index, status) => {
    const updated = [...tasks];
    updated[index].status = status;
    setTasks(updated);
  };

  // Filter tasks based on selected date and filter tab
  const filteredTasks = tasks.filter(
    (task) =>
      task.date === selectedDate.toDateString() &&
      (filter === "open"
        ? task.status === "open"
        : filter === "completed"
        ? task.status === "completed"
        : task.status === "archived")
  );

  return (
    <div
      ref={containerRef}
      style={{
        padding: "20px",
        borderRadius: "12px",
        background: "#ffffff",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        transition: "all 0.3s ease",
      }}
    >
      {/* Header with menu */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h2>Tasks for {selectedDate.toDateString()}</h2>

        {/* Filter menu */}
        <div style={{ display: "flex", gap: "5px" }}>
          {["open", "completed", "archived"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                background: filter === tab ? "#007bff" : "#f0f0f0",
                color: filter === tab ? "#fff" : "#000",
                transition: "all 0.2s ease",
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Input area */}
      {filter === "open" && (
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />
          <button
            onClick={addTask}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
          >
            Add
          </button>
        </div>
      )}

      {/* Task list */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
        }}
      >
        {filteredTasks.length === 0 && (
          <p style={{ textAlign: "center", color: "#888" }}>
            No {filter} tasks for this day
          </p>
        )}

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {filteredTasks.map((task, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
                background:
                  filter === "completed"
                    ? "#d4edda"
                    : filter === "archived"
                    ? "#f8d7da"
                    : "#f0f4ff",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                cursor: "pointer",
              }}
              className="task-item"
            >
              <span
                style={{
                  textDecoration:
                    task.status === "completed" ? "line-through" : "none",
                }}
              >
                {task.text}
              </span>

              <div style={{ display: "flex", gap: "6px" }}>
                {filter === "open" && (
                  <>
                    <button
                      onClick={() => updateTaskStatus(index, "completed")}
                      style={actionBtnStyle("#28a745")}
                    >
                      ✔
                    </button>
                    <button
                      onClick={() => updateTaskStatus(index, "archived")}
                      style={actionBtnStyle("#dc3545")}
                    >
                      🗄
                    </button>
                  </>
                )}
                {filter !== "open" && (
                  <button
                    onClick={() => updateTaskStatus(index, "open")}
                    style={actionBtnStyle("#007bff")}
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

// Helper function for action button styles
const actionBtnStyle = (bgColor) => ({
  background: bgColor,
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "4px 8px",
  cursor: "pointer",
  transition: "background 0.3s ease",
});
