export default function StrengthInfo({ exercise }) {
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
          <div className="col">Weight:</div>
          <div className="col">{exercise.weight} lbs</div>
        </div>
        <div className="row my-3 border-bottom py-2">
          <div className="col">Repetitions:</div>
          <div className="col">{exercise.reps}</div>
        </div>
        <div className="row my-3 border-bottom py-2">
          <div className="col">Sets:</div>
          <div className="col">{exercise.sets}</div>
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
