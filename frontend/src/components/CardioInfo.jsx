export default function CardioInfo({ exercise }) {
  return (
    <>
      <section className="row border-bottom py-2">
        <div className="col">Name:</div>
        <div className="col">{exercise.name}</div>
      </section>
      <section className="row border-bottom py-2">
        <div className="col">Exercise Type:</div>
        <div className="col">{exercise.type}</div>
      </section>
      <section className="row border-bottom py-2">
        <div className="col">Duration:</div>
        <div className="col">{exercise.duration} mins.</div>
      </section>
      <section className="row border-bottom py-2">
        <div className="col">Date:</div>
        <div className="col">
          {String(new Date(exercise.date)).substring(0, 16)}
        </div>
      </section>
      <section className="row border-bottom py-2">
        <div className="col">Last Updated:</div>
        <div className="col">
          {String(new Date(exercise.updatedAt)).substring(0, 16)}
        </div>
      </section>
    </>
  );
}
