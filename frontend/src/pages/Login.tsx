import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { saveToken } from "../utils/auth";

import {
  FileText,
  BrainCircuit,
  Sparkles,
  Eye,
  EyeOff,
  ArrowRight,
  Search,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const data = await login({
        email,
        password,
      });

      saveToken(data.access_token);

      navigate("/dashboard");
    } catch {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 lg:grid lg:grid-cols-2">

      {/* =====================================================
          LEFT — LOGIN
      ====================================================== */}

      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6 py-12 sm:px-10">

        {/* Background decoration */}

        <div className="absolute inset-0 pointer-events-none">

          <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />

          <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-indigo-100/60 blur-3xl" />

        </div>

        <div className="relative z-10 w-full max-w-md">

          {/* Brand */}

          <div className="mb-10 flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20">

              <BrainCircuit size={23} />

            </div>

            <div>

              <h1 className="text-lg font-bold tracking-tight text-slate-900">
                AI Research Workspace
              </h1>

              <p className="text-xs text-slate-500">
                Your documents. Your knowledge.
              </p>

            </div>

          </div>


          {/* Heading */}

          <div className="mb-8">

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Welcome back
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Sign in to continue exploring your AI-powered knowledge base.
            </p>

          </div>


          {/* Google */}

          <button
            type="button"
            className="
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-xl
              border
              border-slate-200
              bg-white
              py-3
              text-sm
              font-semibold
              text-slate-700
              shadow-sm
              transition
              hover:border-slate-300
              hover:bg-slate-50
              hover:shadow
            "
          >

            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path
                fill="#4285F4"
                d="M23.49 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h6.44a5.5 5.5 0 0 1-2.39 3.61v3h3.87c2.27-2.09 3.57-5.17 3.57-8.64Z"
              />

              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.87-3c-1.07.72-2.43 1.15-4.08 1.15-3.14 0-5.8-2.12-6.75-4.97H1.25v3.09A12 12 0 0 0 12 24Z"
              />

              <path
                fill="#FBBC05"
                d="M5.25 14.28A7.2 7.2 0 0 1 4.87 12c0-.79.14-1.56.38-2.28V6.63H1.25A12 12 0 0 0 0 12c0 1.93.46 3.75 1.25 5.37l4-3.09Z"
              />

              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.36.61 4.61 1.81l3.45-3.45C17.95 1.12 15.24 0 12 0A12 12 0 0 0 1.25 6.63l4 3.09C6.2 6.87 8.86 4.75 12 4.75Z"
              />
            </svg>

            Continue with Google

          </button>


          {/* Divider */}

          <div className="my-7 flex items-center gap-4">

            <div className="h-px flex-1 bg-slate-200" />

            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
              or continue with email
            </span>

            <div className="h-px flex-1 bg-slate-200" />

          </div>


          {/* Login form */}

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {/* Email */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  py-3
                  text-sm
                  text-slate-900
                  outline-none
                  transition
                  placeholder:text-slate-400
                  focus:border-blue-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-blue-500/10
                "
              />

            </div>


            {/* Password */}

            <div>

              <div className="mb-2 flex items-center justify-between">

                <label className="text-sm font-medium text-slate-700">
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs font-medium text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </button>

              </div>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    py-3
                    pr-12
                    text-sm
                    text-slate-900
                    outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-blue-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-blue-500/10
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    rounded-lg
                    p-1.5
                    text-slate-400
                    transition
                    hover:bg-slate-100
                    hover:text-slate-600
                  "
                >

                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}

                </button>

              </div>

            </div>


            {/* Login button */}

            <button
              type="submit"
              disabled={loading}
              className="
                group
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                py-3
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-blue-500/20
                transition
                hover:from-blue-700
                hover:to-indigo-700
                hover:shadow-xl
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >

              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in

                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}

            </button>

          </form>


          {/* Register */}

          <p className="mt-8 text-center text-sm text-slate-500">

            Don't have an account?

            <Link
              to="/register"
              className="ml-1.5 font-semibold text-blue-600 hover:text-blue-700"
            >
              Create an account
            </Link>

          </p>


          {/* Security */}

          <div className="mt-10 flex items-center justify-center gap-2 text-xs text-slate-400">

            <ShieldCheck size={14} />

            Your documents remain private and secure.

          </div>

        </div>

      </div>


      {/* =====================================================
          RIGHT — PRODUCT SHOWCASE
      ====================================================== */}

      <div className="
        relative
        hidden
        min-h-screen
        overflow-hidden
        bg-gradient-to-br
        from-slate-950
        via-blue-950
        to-indigo-950
        lg:flex
        items-center
        justify-center
        px-12
      ">

        {/* Grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.08]
            bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
            bg-[size:40px_40px]
          "
        />


        {/* Glow */}

        <div className="
          absolute
          -top-32
          right-0
          h-96
          w-96
          rounded-full
          bg-blue-500/20
          blur-3xl
        " />

        <div className="
          absolute
          -bottom-32
          left-0
          h-96
          w-96
          rounded-full
          bg-purple-500/20
          blur-3xl
        " />


        <div className="relative z-10 w-full max-w-xl">

          {/* Small badge */}

          <div className="
            mb-7
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-white/10
            bg-white/5
            px-4
            py-2
            text-xs
            font-medium
            text-blue-200
            backdrop-blur
          ">

            <Sparkles size={14} />

            AI-powered document intelligence

          </div>


          {/* Main heading */}

          <h2 className="
            text-5xl
            font-bold
            leading-[1.08]
            tracking-tight
            text-white
          ">

            Your documents.
            <span className="block text-blue-400">
              Your AI assistant.
            </span>

          </h2>


          <p className="
            mt-6
            max-w-lg
            text-base
            leading-7
            text-slate-300
          ">

            Upload research papers, resumes, reports and manuals.
            Search your documents and ask questions using natural language.

          </p>


          {/* Product preview */}

          <div className="
            mt-10
            rounded-3xl
            border
            border-white/10
            bg-white/[0.06]
            p-5
            shadow-2xl
            backdrop-blur-xl
          ">

            {/* Fake browser header */}

            <div className="mb-5 flex items-center justify-between">

              <div className="flex gap-1.5">

                <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />

              </div>

              <div className="rounded-lg bg-white/5 px-3 py-1.5 text-[10px] text-slate-400">
                AI Research Workspace
              </div>

            </div>


            {/* Document */}

            <div className="
              flex
              items-center
              gap-4
              rounded-2xl
              border
              border-white/10
              bg-slate-950/40
              p-4
            ">

              <div className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-blue-500/15
                text-blue-400
              ">

                <FileText size={22} />

              </div>

              <div className="min-w-0">

                <p className="truncate text-sm font-semibold text-white">
                  Research_Paper.pdf
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  9 chunks • AI indexed
                </p>

              </div>

              <div className="ml-auto rounded-lg bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-400">
                Ready
              </div>

            </div>


            {/* Search */}

            <div className="
              mt-4
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-white/10
              bg-white/5
              px-4
              py-3
            ">

              <Search
                size={17}
                className="text-slate-500"
              />

              <span className="text-xs text-slate-400">
                What is this document about?
              </span>

            </div>


            {/* AI answer */}

            <div className="
              mt-4
              rounded-2xl
              bg-blue-500/10
              p-4
            ">

              <div className="flex items-center gap-2">

                <div className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-lg
                  bg-blue-500/20
                  text-blue-400
                ">

                  <BrainCircuit size={15} />

                </div>

                <span className="text-xs font-semibold text-blue-300">
                  AI Assistant
                </span>

              </div>

              <p className="
                mt-3
                text-xs
                leading-6
                text-slate-300
              ">

                Based on the uploaded document, this research focuses
                on analyzing the key concepts and findings presented
                in the paper...

              </p>

            </div>

          </div>


          {/* Feature cards */}

          <div className="mt-6 grid grid-cols-3 gap-3">

            <Feature
              icon={<Search size={17} />}
              title="Smart Search"
            />

            <Feature
              icon={<FileText size={17} />}
              title="PDF Analysis"
            />

            <Feature
              icon={<MessageSquare size={17} />}
              title="AI Chat"
            />

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   FEATURE COMPONENT
========================================================= */

function Feature({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="
      flex
      flex-col
      items-center
      justify-center
      gap-2
      rounded-2xl
      border
      border-white/10
      bg-white/[0.04]
      px-3
      py-4
      text-center
    ">

      <div className="text-blue-400">
        {icon}
      </div>

      <span className="text-xs font-medium text-slate-300">
        {title}
      </span>

    </div>
  );
}