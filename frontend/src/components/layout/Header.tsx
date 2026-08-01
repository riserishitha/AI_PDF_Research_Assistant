import {
  BrainCircuit,
  LogOut,
  FolderOpen,
  Bell,
  Settings,
  LayoutDashboard,
  UserCircle,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { removeToken } from "../../utils/auth";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  function logout() {
    removeToken();
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">

      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">

        {/* Logo */}

        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">

            <BrainCircuit
              size={26}
              className="text-white"
            />

          </div>

          <div>

            <h1 className="text-2xl font-bold text-slate-900">
              AI Research Workspace
            </h1>

            <p className="text-sm text-slate-500">
              Intelligent PDF Assistant
            </p>

          </div>

        </div>

        {/* Navigation */}

        <div className="hidden lg:flex items-center gap-3">

          <button
            onClick={() => navigate("/dashboard")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
              location.pathname === "/dashboard"
                ? "bg-blue-100 text-blue-700"
                : "hover:bg-slate-100 text-slate-600"
            }`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-slate-100 text-slate-600 transition"
          >
            <FolderOpen size={18} />
            Projects
          </button>

        </div>

        {/* Right Side */}

        <div className="flex items-center gap-3">

          <button className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center transition">
            <Bell size={20} />
          </button>

          <button className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center transition">
            <Settings size={20} />
          </button>

          <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-2xl">

            <UserCircle
              size={34}
              className="text-blue-600"
            />

            <div className="hidden md:block">

              <p className="font-semibold text-sm">
                Welcome
              </p>

              <p className="text-xs text-slate-500">
                Researcher
              </p>

            </div>

          </div>

          <button
            onClick={logout}
            className="
              flex
              items-center
              gap-2
              bg-red-500
              hover:bg-red-600
              text-white
              px-5
              py-2.5
              rounded-xl
              shadow-md
              transition-all
              duration-300
              hover:scale-105
            "
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </div>

    </header>
  );
}