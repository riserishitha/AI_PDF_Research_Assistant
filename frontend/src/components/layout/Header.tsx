import { LogOut } from "lucide-react";
import Button from "../common/Button";

export default function Header() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

        <div>
          <h1 className="text-2xl font-bold">
            AI Knowledge Assistant
          </h1>

          <p className="text-slate-500">
            Your personal document intelligence
          </p>
        </div>

        <Button
          onClick={logout}
          className="flex items-center gap-2"
        >
          <LogOut size={18} />
          Logout
        </Button>

      </div>
    </header>
  );
}