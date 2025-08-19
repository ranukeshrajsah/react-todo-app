import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarCustom.css"; // Create this file for custom styles

export default function CalendarComponent({ selectedDate, onChange }) {
  return (
    <div className="calendar-container">
      <Calendar
        onChange={onChange}
        value={selectedDate}
        next2Label={null} // Hides the double arrows
        prev2Label={null}
      />
    </div>
  );
}
