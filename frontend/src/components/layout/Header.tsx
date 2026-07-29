import { LogOut, BrainCircuit } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { removeToken } from "../../utils/auth";

export default function Header() {
  const navigate = useNavigate();

  function logout() {
    removeToken();
    navigate("/");
  }

  return (
    <header className="bg-white border-b border-slate-200">

      <div className="max-w-7xl mx-auto px-8 h-20 flex justify-between items-center">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">

            <BrainCircuit
              className="text-white"
              size={26}
            />

          </div>

          <div>

            <h1 className="font-bold text-2xl text-slate-900">
              AI Research Workspace
            </h1>

            <p className="text-sm text-slate-500">
              Your personal PDF Knowledge Assistant
            </p>

          </div>

        </div>

        <button
          onClick={logout}
          className="
          flex
          items-center
          gap-2
          bg-red-50
          hover:bg-red-100
          text-red-600
          px-5
          py-2
          rounded-xl
          transition
          "
        >
          <LogOut size={18} />

          Logout
        </button>

      </div>

    </header>
  );
}