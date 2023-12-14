import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import "../styles/BackButton.css";

export default function BackButton({ className }) {
  return (
    <Link to="/">
      <button
        className={`position-absolute ms-4 button ${className}`}
        style={{ fontSize: "1.5rem" }}
      >
        <BsArrowLeft />
      </button>
    </Link>
  );
}
