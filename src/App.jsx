import { useState, useEffect } from "react";
import CalendarComponent from "./components/CalendarComponent";
import TasksBox from "./components/TasksBox";

export default function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("theme");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // Persistent avatar
  const [userImage, setUserImage] = useState(() => {
    const savedImage = localStorage.getItem("userImage");
    return savedImage ? savedImage : "/default-avatar.png";
  });

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(darkMode));
  }, [darkMode]);

  // Save avatar whenever it changes
  const handleChangeImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgData = e.target.result;
        setUserImage(imgData);
        localStorage.setItem("userImage", imgData); // Persist image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div
        style={{
          padding: "20px",
          fontFamily: "Arial",
          minHeight: "100vh",
          width: "100%",
          background: darkMode ? "#121212" : "#f5f5f5",
          color: darkMode ? "#ffffff" : "#000000",
          transition: "all 0.3s ease",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Logo / Avatar */}
            <label htmlFor="user-image-input" style={{ cursor: "pointer" }}>
              <img
                src={userImage}
                alt="User Avatar"
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  borderRadius: "6px", // rectangle with rounded corners
                  border: "2px solid #007bff",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                className="avatar-bubble"
              />
            </label>
            <input
              id="user-image-input"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleChangeImage}
            />

            <h1>I am Ran</h1>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              padding: "8px 12px",
              borderRadius: "25px",
              background: darkMode ? "#333" : "#ddd",
              color: darkMode ? "#fff" : "#000",
              border: "none",
              cursor: "pointer",
            }}
          >
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>
        </header>

        {/* Main Content: Calendar + Tasks Side by Side */}
        <div
          style={{
            display: "flex",
            flex: 1,
            gap: "20px",
            flexWrap: "wrap", // responsive wrap
          }}
        >
          {/* Calendar */}
          <div style={{ flex: "1 1 350px", minWidth: "300px" }}>
            <CalendarComponent selectedDate={selectedDate} onChange={setSelectedDate} />
          </div>

          {/* Tasks Box */}
          <div style={{ flex: "1 1 350px", minWidth: "300px", height: "100%" }}>
            <TasksBox selectedDate={selectedDate} />
          </div>
        </div>
      </div>
    </div>
  );
}
