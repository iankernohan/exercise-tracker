import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

export default function BackButton({ className }) {
  return (
    <Link to="/">
      <button
        className={`btn btn-primary position-absolute ms-4 py-0 ${className}`}
        style={{ fontSize: "1.5rem" }}
      >
        <BsArrowLeft />
      </button>
    </Link>
  );
}
