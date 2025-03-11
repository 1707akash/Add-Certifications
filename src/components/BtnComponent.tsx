import "../Pages/Certificate.css";
import { ReactNode } from "react";

interface BtnComponentProps {
  text: string;
  onClick: () => void;
  className?: string;
  height?: string;
  border?: string;
  boxShadow?: string;
  icon?: React.ReactNode;
}

const BtnComponent: React.FC<BtnComponentProps> = ({
  text,
  onClick,
  className = "",
  height = "",
  boxShadow = "none",
  icon
}) => {
  return (
    <button
      className={`btnComponent ${className}`}
      onClick={onClick}
      style={{ height, boxShadow }}
    >
      {text}
      {icon && <span className="ms-2">{icon}</span>}
    </button>
  );
};

export default BtnComponent;