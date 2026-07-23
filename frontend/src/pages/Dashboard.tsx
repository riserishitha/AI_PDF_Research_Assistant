import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-6 py-3 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}