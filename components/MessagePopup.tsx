import { FiAlertCircle, FiX } from "react-icons/fi";

interface Props {
  message: string;
  setMessage: Function;
}

export default function MessagePopup({ message, setMessage }: Props) {
  return (
    <div
      className={`${
        message.includes("Error") ? "bg-red-500" : "bg-blue-500"
      }  fixed bottom-5 left-5 flex items-center  text-white text-sm font-bold px-4 py-3`}
      role="alert"
    >
      <FiAlertCircle size={18} />
      <p className="ml-2">{message}</p>
      <button onClick={() => setMessage("")} className="text-md ml-5">
        <FiX size={18} />
      </button>
    </div>
  );
}
