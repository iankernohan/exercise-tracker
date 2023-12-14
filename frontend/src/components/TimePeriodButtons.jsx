import "../styles/TypeButtons.css";

export default function TimePeriodButtons({ thisWeek, setThisWeek }) {
  return (
    <div className="align-self-center type-buttons">
      <button
        className={thisWeek ? "active-button" : "non-active"}
        onClick={() => setThisWeek(true)}
      >
        This Week
      </button>
      <button
        className={!thisWeek ? "active-button" : "non-active"}
        onClick={() => setThisWeek(false)}
      >
        All
      </button>
    </div>
  );
}
