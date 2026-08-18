import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  FolderOpen,
  FileText,
  Sparkles,
  Database,
  Plus,
  ArrowRight,
  Clock3,
  MessageSquare,
  Upload,
  Brain,
  ChevronRight,
  Command,
  Zap,
  BarChart3,
} from "lucide-react";

import Layout from "../components/layout/Layout";
import Header from "../components/layout/Header";
import Button from "../components/common/Button";

import ProjectCard from "../project/ProjectCard";
import CreateProjectModal from "../project/CreateProjectModal";

import { getProjects } from "../services/projectService";

import type { Project } from "../types/project";

export default function Dashboard() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  }

  const filteredProjects = useMemo(() => {
    return projects.filter((project) =>
      project.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [projects, search]);

  return (
    <Layout>
      <Header />

      <main className="min-h-screen bg-[#f8fafc]">

        {/* =========================================================
            HERO
        ========================================================= */}

        <section className="px-4 sm:px-6 lg:px-8 pt-6">

          <div
            className="
              relative
              max-w-7xl
              mx-auto
              overflow-hidden
              rounded-[28px]
              bg-[#0b1220]
              border
              border-slate-800
              shadow-2xl
            "
          >

            {/* Background decoration */}

            <div className="absolute inset-0 pointer-events-none">

              <div
                className="
                  absolute
                  -top-32
                  -right-32
                  w-[420px]
                  h-[420px]
                  rounded-full
                  bg-blue-600/20
                  blur-3xl
                "
              />

              <div
                className="
                  absolute
                  -bottom-40
                  left-1/3
                  w-[500px]
                  h-[300px]
                  rounded-full
                  bg-indigo-600/10
                  blur-3xl
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  opacity-[0.04]
                  bg-[radial-gradient(#ffffff_1px,transparent_1px)]
                  [background-size:24px_24px]
                "
              />

            </div>

            <div
              className="
                relative
                grid
                lg:grid-cols-[1.15fr_0.85fr]
                gap-12
                items-center
                px-7
                py-10
                sm:px-10
                sm:py-12
                lg:px-14
                lg:py-14
              "
            >

              {/* HERO CONTENT */}

              <div>

                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-3
                    py-1.5
                    rounded-full
                    border
                    border-blue-400/20
                    bg-blue-500/10
                    text-blue-200
                    text-xs
                    font-semibold
                  "
                >

                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />

                  AI RESEARCH WORKSPACE

                </div>

                <h1
                  className="
                    mt-6
                    text-4xl
                    sm:text-5xl
                    lg:text-[54px]
                    font-bold
                    tracking-tight
                    text-white
                    leading-[1.05]
                  "
                >
                  Your documents.
                  <span className="block text-blue-400">
                    Your AI assistant.
                  </span>
                </h1>

                <p
                  className="
                    mt-6
                    max-w-xl
                    text-base
                    sm:text-lg
                    text-slate-400
                    leading-7
                  "
                >
                  Upload your research papers, resumes, reports and
                  documents. Search, understand and chat with your
                  knowledge base using AI.
                </p>

                <div className="flex flex-wrap gap-3 mt-8">

                  <Button
                    onClick={() => setOpenModal(true)}
                    className="
                      !bg-blue-600
                      hover:!bg-blue-500
                      !text-white
                      px-6
                      py-3.5
                      rounded-xl
                      font-semibold
                      shadow-lg
                      shadow-blue-600/20
                      transition-all
                      hover:-translate-y-0.5
                    "
                  >
                    <Plus size={18} />

                    <span className="ml-2">
                      New Project
                    </span>
                  </Button>

                  <button
                    onClick={() =>
                      document
                        .getElementById("projects")
                        ?.scrollIntoView({
                          behavior: "smooth",
                        })
                    }
                    className="
                      px-6
                      py-3.5
                      rounded-xl
                      border
                      border-white/15
                      bg-white/5
                      text-white
                      font-medium
                      hover:bg-white/10
                      transition
                    "
                  >
                    View Projects
                  </button>

                </div>

                {/* Small trust indicators */}

                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-x-6
                    gap-y-3
                    mt-8
                    text-sm
                    text-slate-500
                  "
                >

                  <span className="flex items-center gap-2">
                    <Zap size={15} className="text-blue-400" />
                    Semantic Search
                  </span>

                  <span className="flex items-center gap-2">
                    <Brain size={15} className="text-purple-400" />
                    AI-Powered Answers
                  </span>

                  <span className="flex items-center gap-2">
                    <Database size={15} className="text-cyan-400" />
                    Private Knowledge Base
                  </span>

                </div>

              </div>

              {/* PRODUCT PREVIEW */}

              <div className="relative hidden lg:block">

                <div
                  className="
                    absolute
                    -inset-6
                    bg-blue-500/10
                    blur-3xl
                    rounded-full
                  "
                />

                <div
                  className="
                    relative
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.06]
                    backdrop-blur-xl
                    p-5
                    shadow-2xl
                  "
                >

                  {/* Window header */}

                  <div className="flex items-center justify-between">

                    <div className="flex gap-1.5">

                      <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />

                    </div>

                    <span className="text-xs text-slate-500">
                      AI Workspace
                    </span>

                    <Command
                      size={15}
                      className="text-slate-500"
                    />

                  </div>

                  {/* Search */}

                  <div
                    className="
                      mt-5
                      rounded-xl
                      border
                      border-white/10
                      bg-black/20
                      px-4
                      py-3
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <Search
                      size={17}
                      className="text-slate-500"
                    />

                    <span className="text-sm text-slate-400">
                      Ask anything about your documents...
                    </span>

                  </div>

                  {/* Documents */}

                  <div className="mt-5 space-y-3">

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        p-3
                        rounded-xl
                        bg-white/[0.05]
                        border
                        border-white/5
                      "
                    >

                      <div className="p-2 rounded-lg bg-red-500/10">
                        <FileText
                          size={17}
                          className="text-red-400"
                        />
                      </div>

                      <div className="flex-1">

                        <p className="text-sm text-white">
                          Research_Paper.pdf
                        </p>

                        <p className="text-xs text-slate-500">
                          2.4 MB · 18 pages
                        </p>

                      </div>

                      <span className="text-xs text-green-400">
                        Indexed
                      </span>

                    </div>

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        p-3
                        rounded-xl
                        bg-white/[0.05]
                        border
                        border-white/5
                      "
                    >

                      <div className="p-2 rounded-lg bg-blue-500/10">
                        <FileText
                          size={17}
                          className="text-blue-400"
                        />
                      </div>

                      <div className="flex-1">

                        <p className="text-sm text-white">
                          Resume.pdf
                        </p>

                        <p className="text-xs text-slate-500">
                          840 KB · 3 pages
                        </p>

                      </div>

                      <span className="text-xs text-green-400">
                        Indexed
                      </span>

                    </div>

                  </div>

                  {/* AI response */}

                  <div
                    className="
                      mt-4
                      rounded-xl
                      bg-blue-500/10
                      border
                      border-blue-400/10
                      p-4
                    "
                  >

                    <div className="flex gap-2 items-center">

                      <div className="p-1.5 rounded-lg bg-blue-500/20">
                        <Sparkles
                          size={14}
                          className="text-blue-300"
                        />
                      </div>

                      <span className="text-xs font-semibold text-blue-200">
                        AI Response
                      </span>

                    </div>

                    <p className="mt-3 text-sm text-slate-300 leading-6">
                      I found 4 relevant sections in your documents
                      related to this question...
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =========================================================
            STATS
        ========================================================= */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

            <StatCard
              icon={FolderOpen}
              label="Projects"
              value={projects.length}
              iconClass="text-blue-600"
              bgClass="bg-blue-50"
            />

            <StatCard
              icon={FileText}
              label="Documents"
              value="--"
              iconClass="text-emerald-600"
              bgClass="bg-emerald-50"
            />

            <StatCard
              icon={MessageSquare}
              label="AI Conversations"
              value="--"
              iconClass="text-violet-600"
              bgClass="bg-violet-50"
            />

            <StatCard
              icon={Database}
              label="Storage Used"
              value="--"
              iconClass="text-orange-600"
              bgClass="bg-orange-50"
            />

          </div>

        </section>

        {/* =========================================================
            QUICK ACTIONS
        ========================================================= */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">

          <div className="flex items-center justify-between mb-4">

            <div>

              <h2 className="text-lg font-bold text-slate-900">
                Quick Actions
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Get started with your workspace.
              </p>

            </div>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

            <QuickAction
              icon={Plus}
              title="New Project"
              description="Create a workspace"
              iconClass="text-blue-600"
              bgClass="bg-blue-50"
              onClick={() => setOpenModal(true)}
            />

            <QuickAction
              icon={Upload}
              title="Upload Documents"
              description="Add PDFs to a project"
              iconClass="text-emerald-600"
              bgClass="bg-emerald-50"
            />

            <QuickAction
              icon={MessageSquare}
              title="Continue Chat"
              description="Resume a conversation"
              iconClass="text-violet-600"
              bgClass="bg-violet-50"
            />

            <QuickAction
              icon={FolderOpen}
              title="Browse Projects"
              description="Open your workspace"
              iconClass="text-orange-600"
              bgClass="bg-orange-50"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            />

          </div>

        </section>

        {/* =========================================================
            PROJECTS
        ========================================================= */}

        <section
          id="projects"
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            mt-14
            pb-16
          "
        >

          <div className="grid lg:grid-cols-[1fr_300px] gap-8">

            {/* MAIN */}

            <div>

              {/* Header */}

              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-end
                  justify-between
                  gap-5
                  mb-6
                "
              >

                <div>

                  <div className="flex items-center gap-2">

                    <h2 className="text-2xl font-bold text-slate-900">
                      Your Projects
                    </h2>

                    <span
                      className="
                        px-2.5
                        py-1
                        rounded-full
                        bg-slate-100
                        text-slate-600
                        text-xs
                        font-semibold
                      "
                    >
                      {filteredProjects.length}
                    </span>

                  </div>

                  <p className="text-slate-500 mt-1">
                    Your AI-powered document workspaces.
                  </p>

                </div>

                {/* Search */}

                <div
                  className="
                    w-full
                    sm:w-80
                    flex
                    items-center
                    gap-3
                    px-4
                    py-2.5
                    bg-white
                    border
                    border-slate-200
                    rounded-xl
                    shadow-sm
                    focus-within:ring-2
                    focus-within:ring-blue-500/20
                    focus-within:border-blue-400
                  "
                >

                  <Search
                    size={18}
                    className="text-slate-400"
                  />

                  <input
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search projects..."
                    className="
                      flex-1
                      bg-transparent
                      outline-none
                      text-sm
                      text-slate-700
                      placeholder:text-slate-400
                    "
                  />

                  <span className="hidden sm:flex text-[10px] text-slate-400 border rounded px-1.5 py-0.5">
                    ⌘ K
                  </span>

                </div>

              </div>

              {/* Project grid */}

              {filteredProjects.length === 0 ? (

                <div
                  className="
                    bg-white
                    border
                    border-slate-200
                    rounded-3xl
                    p-12
                    sm:p-16
                    text-center
                  "
                >

                  <div
                    className="
                      w-16
                      h-16
                      mx-auto
                      rounded-2xl
                      bg-blue-50
                      flex
                      items-center
                      justify-center
                    "
                  >

                    <FolderOpen
                      size={30}
                      className="text-blue-500"
                    />

                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mt-5">
                    {search
                      ? "No projects found"
                      : "Create your first project"}
                  </h3>

                  <p className="text-slate-500 max-w-md mx-auto mt-2 leading-6">
                    {search
                      ? "Try searching with a different project name."
                      : "Create a workspace, upload your documents and start asking questions."}
                  </p>

                  {!search && (
                    <Button
                      onClick={() => setOpenModal(true)}
                      className="mt-6"
                    >
                      <Plus size={17} />

                      <span className="ml-2">
                        Create Project
                      </span>
                    </Button>
                  )}

                </div>

              ) : (

                <div className="grid md:grid-cols-2 gap-5">

                  {filteredProjects.map((project) => (

                    <div
                      key={project.id}
                      className="
                        transition-all
                        duration-300
                        hover:-translate-y-1
                      "
                    >

                      <ProjectCard
                        project={project}
                        onClick={() =>
                          navigate(`/project/${project.id}`)
                        }
                      />

                    </div>

                  ))}

                </div>

              )}

            </div>

            {/* =====================================================
                SIDEBAR
            ===================================================== */}

            <aside className="space-y-5">

              {/* Recent Activity */}

              <div
                className="
                  bg-white
                  border
                  border-slate-200
                  rounded-3xl
                  p-5
                "
              >

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-2">

                    <Clock3
                      size={18}
                      className="text-blue-600"
                    />

                    <h3 className="font-bold text-slate-900">
                      Getting Started
                    </h3>

                  </div>

                  <span className="text-xs text-slate-400">
                    Guide
                  </span>

                </div>

                <div className="mt-5 space-y-4">

                  <ActivityItem
                    icon={Plus}
                    title="Create a project"
                    description="Set up your workspace."
                    bg="bg-blue-50"
                    color="text-blue-600"
                  />

                  <ActivityItem
                    icon={Upload}
                    title="Upload documents"
                    description="Add PDFs to your project."
                    bg="bg-emerald-50"
                    color="text-emerald-600"
                  />

                  <ActivityItem
                    icon={MessageSquare}
                    title="Ask your documents"
                    description="Start an AI conversation."
                    bg="bg-violet-50"
                    color="text-violet-600"
                  />

                </div>

              </div>

              {/* AI Tip */}

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-3xl
                  bg-gradient-to-br
                  from-blue-600
                  to-indigo-700
                  p-6
                  text-white
                  shadow-xl
                  shadow-blue-600/10
                "
              >

                <div
                  className="
                    absolute
                    -right-12
                    -top-12
                    w-32
                    h-32
                    rounded-full
                    bg-white/10
                  "
                />

                <div
                  className="
                    relative
                    w-10
                    h-10
                    rounded-xl
                    bg-white/15
                    flex
                    items-center
                    justify-center
                  "
                >

                  <Sparkles size={20} />

                </div>

                <h3 className="relative text-xl font-bold mt-5">
                  Get better answers
                </h3>

                <p className="relative mt-2 text-sm text-blue-100 leading-6">
                  Ask specific questions instead of broad prompts.
                </p>

                <div
                  className="
                    relative
                    mt-5
                    bg-white/10
                    border
                    border-white/10
                    rounded-2xl
                    p-4
                  "
                >

                  <p className="text-xs text-blue-200">
                    Try asking
                  </p>

                  <p className="mt-2 text-sm leading-6">
                    "What are the key findings of this research paper?"
                  </p>

                </div>

                <button
                  className="
                    relative
                    mt-5
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    hover:gap-3
                    transition-all
                  "
                >

                  Learn more

                  <ArrowRight size={16} />

                </button>

              </div>

            </aside>

          </div>

        </section>

      </main>

      <CreateProjectModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreated={() => {
          loadProjects();
          setOpenModal(false);
        }}
      />

    </Layout>
  );
}


/* ================================================================
   STAT CARD
================================================================ */

function StatCard({
  icon: Icon,
  label,
  value,
  iconClass,
  bgClass,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  iconClass: string;
  bgClass: string;
}) {
  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-2xl
        p-5
        transition
        hover:shadow-md
      "
    >

      <div className="flex items-center justify-between">

        <div
          className={`
            w-10
            h-10
            rounded-xl
            ${bgClass}
            flex
            items-center
            justify-center
          `}
        >

          <Icon
            size={19}
            className={iconClass}
          />

        </div>

        <BarChart3
          size={15}
          className="text-slate-300"
        />

      </div>

      <p className="text-sm text-slate-500 mt-5">
        {label}
      </p>

      <p className="text-2xl font-bold text-slate-900 mt-1">
        {value}
      </p>

    </div>
  );
}


/* ================================================================
   QUICK ACTION
================================================================ */

function QuickAction({
  icon: Icon,
  title,
  description,
  iconClass,
  bgClass,
  onClick,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  iconClass: string;
  bgClass: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="
        group
        bg-white
        border
        border-slate-200
        rounded-2xl
        p-5
        text-left
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-md
        hover:border-slate-300
      "
    >

      <div className="flex items-center justify-between">

        <div
          className={`
            w-10
            h-10
            rounded-xl
            ${bgClass}
            flex
            items-center
            justify-center
          `}
        >

          <Icon
            size={19}
            className={iconClass}
          />

        </div>

        <ChevronRight
          size={17}
          className="
            text-slate-300
            group-hover:text-slate-600
            group-hover:translate-x-1
            transition
          "
        />

      </div>

      <h3 className="font-semibold text-slate-900 mt-4">
        {title}
      </h3>

      <p className="text-sm text-slate-500 mt-1">
        {description}
      </p>

    </button>
  );
}


/* ================================================================
   ACTIVITY ITEM
================================================================ */

function ActivityItem({
  icon: Icon,
  title,
  description,
  bg,
  color,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  bg: string;
  color: string;
}) {
  return (
    <div className="flex gap-3">

      <div
        className={`
          shrink-0
          w-9
          h-9
          rounded-xl
          ${bg}
          flex
          items-center
          justify-center
        `}
      >

        <Icon
          size={16}
          className={color}
        />

      </div>

      <div>

        <p className="text-sm font-semibold text-slate-900">
          {title}
        </p>

        <p className="text-xs text-slate-500 mt-0.5 leading-5">
          {description}
        </p>

      </div>

    </div>
  );
}