export default function CardioInfo({ exercise }) {
  return (
    <div className="d-flex flex-col justify-content-center">
      <div className="container w-50 mt-5">
        <div className="row my-3 border-bottom py-2">
          <div className="col">Name:</div>
          <div className="col">{exercise.name}</div>
        </div>
        <div className="row my-3 border-bottom py-2">
          <div className="col">Exercise Type:</div>
          <div className="col">{exercise.type}</div>
        </div>
        <div className="row my-3 border-bottom py-2">
          <div className="col">Duration:</div>
          <div className="col">{exercise.duration} mins.</div>
        </div>
        <div className="row my-3 border-bottom py-2">
          <div className="col">Date:</div>
          <div className="col">
            {String(new Date(exercise.date)).substring(0, 16)}
          </div>
        </div>
        <div className="row my-3 border-bottom py-2">
          <div className="col">Last Updated:</div>
          <div className="col">
            {String(new Date(exercise.updatedAt)).substring(0, 16)}
          </div>
        </div>
      </div>
    </div>
  );
}
