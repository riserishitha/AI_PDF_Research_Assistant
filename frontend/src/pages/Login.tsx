import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { saveToken } from "../utils/auth";
import { FileText, BrainCircuit, Sparkles } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const data = await login({
        email,
        password,
      });

      saveToken(data.access_token);

      navigate("/dashboard");
    } catch {
      alert("Invalid email or password");
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-100">

      {/* LEFT */}

      <div className="flex items-center justify-center p-10 bg-white">

        <div className="w-full max-w-md">

          <div className="flex items-center gap-3 mb-8">

            <div className="bg-blue-600 p-3 rounded-xl text-white">
              <BrainCircuit size={24} />
            </div>

            <div>
              <h1 className="font-bold text-2xl">
                AI Research Workspace
              </h1>

              <p className="text-slate-500">
                Chat with your PDFs
              </p>
            </div>

          </div>

          <h2 className="text-4xl font-bold mb-2">
            Welcome Back
          </h2>

          <p className="text-slate-500 mb-8">
            Login to continue exploring your knowledge base.
          </p>

          <button
            className="
            w-full
            border
            rounded-xl
            py-3
            font-medium
            hover:bg-slate-50
            transition
            "
          >
            Continue with Google
          </button>

          <div className="flex items-center my-6">

            <div className="flex-1 border-t"></div>

            <span className="mx-3 text-slate-400">
              OR
            </span>

            <div className="flex-1 border-t"></div>

          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="
              w-full
              border
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-blue-500
              "
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="
              w-full
              border
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-blue-500
              "
            />

            <button
              className="
              w-full
              bg-blue-600
              text-white
              py-3
              rounded-xl
              hover:bg-blue-700
              transition
              "
            >
              Login
            </button>

          </form>

          <p className="text-center mt-8 text-slate-500">

            New here?

            <Link
              to="/register"
              className="text-blue-600 font-semibold ml-2"
            >
              Create Account
            </Link>

          </p>

        </div>

      </div>

      {/* RIGHT */}

      <div
        className="
        hidden
        lg:flex
        items-center
        justify-center
        bg-gradient-to-br
        from-blue-700
        via-indigo-600
        to-purple-700
        relative
        overflow-hidden
        "
      >

        <div className="absolute w-72 h-72 rounded-full bg-white/10 -top-20 -left-20"></div>

        <div className="absolute w-96 h-96 rounded-full bg-white/5 bottom-0 -right-24"></div>

        <div className="relative z-10 text-white max-w-lg">

          <div className="bg-white/10 rounded-3xl p-8 backdrop-blur-lg">

            <div className="flex justify-center mb-8">

              <div className="bg-white/20 p-5 rounded-full">
                <FileText size={60}/>
              </div>

            </div>

            <h2 className="text-4xl font-bold leading-tight">

              Turn PDFs into an

              <span className="block mt-2">
                AI Knowledge Assistant
              </span>

            </h2>

            <p className="mt-6 text-lg text-blue-100">

              Upload research papers, resumes, reports, manuals
              and ask natural language questions powered by AI.

            </p>

            <div className="grid grid-cols-3 gap-4 mt-10">

              <div className="bg-white/10 rounded-xl p-4 text-center">
                <Sparkles className="mx-auto mb-2" />
                Smart Search
              </div>

              <div className="bg-white/10 rounded-xl p-4 text-center">
                <FileText className="mx-auto mb-2" />
                PDF Analysis
              </div>

              <div className="bg-white/10 rounded-xl p-4 text-center">
                <BrainCircuit className="mx-auto mb-2" />
                AI Chat
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}