const sortByStlyes = { textDecoration: "underline", fontWeight: "600" };

export default function ColumnLabels({ sortBy, setSortBy }) {
  return (
    <div className="row my-4" id="exercise-column-labels">
      <div
        className="col-3 ps-3 exercise-column-label"
        onClick={() => setSortBy("name")}
        style={sortBy === "name" ? sortByStlyes : {}}
      >
        Exercise Name
      </div>
      <div
        className="col-3 ps-5 exercise-column-label"
        onClick={() => setSortBy("type")}
        style={sortBy === "type" ? sortByStlyes : {}}
      >
        Exercise Type
      </div>
      <div
        className="col-3 ps-5 exercise-column-label"
        onClick={() => setSortBy("date")}
        style={sortBy === "date" ? sortByStlyes : {}}
      >
        Exercise Date
      </div>
      <div className="col-3 text-center pe-4">Options</div>
    </div>
  );
}
