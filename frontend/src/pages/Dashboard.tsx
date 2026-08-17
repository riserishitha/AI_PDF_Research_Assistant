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
  Clock,
  MessageSquare,
  Upload,
  Brain,
  ChevronRight,
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

      <main className="min-h-screen bg-[#f7f9fc]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10 py-8">

          {/* ===================================================== */}
          {/* HERO */}
          {/* ===================================================== */}

          <section className="relative overflow-hidden rounded-[28px] bg-slate-950 shadow-2xl">

            {/* Background decoration */}

            <div className="absolute inset-0">
              <div className="absolute -top-32 -right-20 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl" />
              <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
              <div className="absolute top-20 left-1/2 w-40 h-40 bg-cyan-400/10 rounded-full blur-2xl" />
            </div>

            <div className="relative grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center p-8 sm:p-10 lg:p-12">

              {/* Hero text */}

              <div className="max-w-2xl">

                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm text-blue-100 backdrop-blur">
                  <Sparkles size={15} className="text-cyan-300" />
                  AI-powered document workspace
                </div>

                <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-white leading-[1.08]">
                  Your documents.
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
                    Your AI assistant.
                  </span>
                </h1>

                <p className="mt-6 text-base sm:text-lg text-slate-300 leading-8 max-w-xl">
                  Upload your PDFs, organize them into projects, and ask
                  questions using natural language. Your documents become
                  searchable knowledge.
                </p>

                <div className="flex flex-wrap gap-3 mt-8">

                  <Button
                    onClick={() => setOpenModal(true)}
                    className="
                      !bg-white
                      !text-slate-900
                      hover:!bg-blue-50
                      px-6
                      py-3
                      rounded-xl
                      font-semibold
                      shadow-lg
                      transition-all
                      hover:-translate-y-0.5
                    "
                  >
                    <Plus size={18} />
                    <span className="ml-2">Create Project</span>
                  </Button>

                  <button
                    onClick={() =>
                      document
                        .getElementById("projects")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="
                      inline-flex
                      items-center
                      gap-2
                      px-6
                      py-3
                      rounded-xl
                      border
                      border-white/15
                      bg-white/[0.05]
                      text-white
                      font-medium
                      hover:bg-white/10
                      transition
                    "
                  >
                    View Projects
                    <ArrowRight size={17} />
                  </button>

                </div>

              </div>

              {/* AI preview */}

              <div className="hidden lg:block">

                <div className="rounded-3xl border border-white/10 bg-white/[0.07] backdrop-blur-xl p-5 shadow-2xl">

                  <div className="flex items-center justify-between mb-5">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                        <Brain
                          size={21}
                          className="text-cyan-300"
                        />
                      </div>

                      <div>
                        <p className="text-white font-semibold">
                          AI Workspace
                        </p>

                        <p className="text-xs text-slate-400">
                          Ready to answer
                        </p>
                      </div>

                    </div>

                    <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-[0_0_12px_rgba(52,211,153,0.8)]" />

                  </div>

                  <div className="space-y-3">

                    <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] border border-white/5 p-4">

                      <div className="w-9 h-9 rounded-lg bg-red-500/15 flex items-center justify-center">
                        <FileText
                          size={18}
                          className="text-red-300"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white font-medium">
                          Research Paper.pdf
                        </p>

                        <p className="text-xs text-slate-400">
                          12 pages
                        </p>
                      </div>

                      <span className="text-xs text-emerald-300">
                        Indexed
                      </span>

                    </div>

                    <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] border border-white/5 p-4">

                      <div className="w-9 h-9 rounded-lg bg-blue-500/15 flex items-center justify-center">
                        <FileText
                          size={18}
                          className="text-blue-300"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white font-medium">
                          Resume.pdf
                        </p>

                        <p className="text-xs text-slate-400">
                          3 pages
                        </p>
                      </div>

                      <span className="text-xs text-emerald-300">
                        Indexed
                      </span>

                    </div>

                    <div className="rounded-2xl bg-cyan-400 p-4 text-slate-950">

                      <div className="flex items-center gap-2">

                        <MessageSquare size={17} />

                        <span className="text-sm font-semibold">
                          Ask your documents
                        </span>

                      </div>

                      <p className="mt-2 text-sm text-slate-800/80">
                        "What are the main findings?"
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>
          </section>

          {/* ===================================================== */}
          {/* QUICK ACTIONS */}
          {/* ===================================================== */}

          <section className="mt-8">

            <div className="flex items-center justify-between mb-4">

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Quick actions
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Get started with your workspace
                </p>
              </div>

            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

              {[
                {
                  icon: Plus,
                  title: "New Project",
                  description: "Create a workspace",
                  iconClass: "bg-blue-50 text-blue-600",
                  onClick: () => setOpenModal(true),
                },
                {
                  icon: Upload,
                  title: "Upload PDFs",
                  description: "Add documents",
                  iconClass: "bg-emerald-50 text-emerald-600",
                },
                {
                  icon: MessageSquare,
                  title: "Continue Chat",
                  description: "Resume conversations",
                  iconClass: "bg-purple-50 text-purple-600",
                },
                {
                  icon: FolderOpen,
                  title: "Browse Projects",
                  description: "View all workspaces",
                  iconClass: "bg-orange-50 text-orange-600",
                  onClick: () =>
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({ behavior: "smooth" }),
                },
              ].map((action) => {

                const Icon = action.icon;

                return (
                  <button
                    key={action.title}
                    onClick={action.onClick}
                    className="
                      group
                      bg-white
                      border
                      border-slate-200
                      rounded-2xl
                      p-5
                      text-left
                      hover:border-slate-300
                      hover:shadow-lg
                      transition-all
                      duration-200
                    "
                  >

                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center ${action.iconClass}`}
                    >
                      <Icon size={20} />
                    </div>

                    <div className="flex items-center justify-between mt-5">

                      <div>

                        <h3 className="font-semibold text-slate-900">
                          {action.title}
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                          {action.description}
                        </p>

                      </div>

                      <ChevronRight
                        size={18}
                        className="
                          text-slate-300
                          group-hover:text-slate-600
                          group-hover:translate-x-1
                          transition
                        "
                      />

                    </div>

                  </button>
                );
              })}

            </div>

          </section>

          {/* ===================================================== */}
          {/* STATS */}
          {/* ===================================================== */}

          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

            {[
              {
                icon: FolderOpen,
                title: "Projects",
                value: projects.length,
                description: "Workspaces",
                className: "text-blue-600 bg-blue-50",
              },
              {
                icon: FileText,
                title: "Documents",
                value: "--",
                description: "PDF files",
                className: "text-emerald-600 bg-emerald-50",
              },
              {
                icon: MessageSquare,
                title: "AI Chats",
                value: "--",
                description: "Conversations",
                className: "text-purple-600 bg-purple-50",
              },
              {
                icon: Database,
                title: "Storage",
                value: "--",
                description: "Used storage",
                className: "text-orange-600 bg-orange-50",
              },
            ].map((item) => {

              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="
                    bg-white
                    border
                    border-slate-200
                    rounded-2xl
                    p-5
                    hover:shadow-md
                    transition
                  "
                >

                  <div className="flex items-center justify-between">

                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.className}`}
                    >
                      <Icon size={20} />
                    </div>

                  </div>

                  <p className="text-sm text-slate-500 mt-5">
                    {item.title}
                  </p>

                  <div className="flex items-end gap-2 mt-1">

                    <h2 className="text-3xl font-bold text-slate-900">
                      {item.value}
                    </h2>

                    <span className="text-xs text-slate-400 mb-1">
                      {item.description}
                    </span>

                  </div>

                </div>
              );
            })}

          </section>

          {/* ===================================================== */}
          {/* SEARCH */}
          {/* ===================================================== */}

          <section className="mt-10">

            <div className="relative">

              <Search
                size={20}
                className="
                  absolute
                  left-5
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search your projects..."
                className="
                  w-full
                  bg-white
                  border
                  border-slate-200
                  rounded-2xl
                  pl-14
                  pr-5
                  py-4
                  outline-none
                  text-slate-900
                  placeholder:text-slate-400
                  focus:border-blue-400
                  focus:ring-4
                  focus:ring-blue-500/10
                  transition
                  shadow-sm
                "
              />

            </div>

          </section>

          {/* ===================================================== */}
          {/* PROJECTS */}
          {/* ===================================================== */}

          <section
            id="projects"
            className="mt-12"
          >

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-7">

              <div>

                <div className="flex items-center gap-2">

                  <h2 className="text-2xl font-bold text-slate-900">
                    Your Projects
                  </h2>

                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                    {filteredProjects.length}
                  </span>

                </div>

                <p className="text-slate-500 mt-2">
                  Your AI-powered document workspaces.
                </p>

              </div>

              {projects.length > 0 && (
                <button
                  onClick={() => setOpenModal(true)}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-blue-600
                    hover:text-blue-700
                  "
                >
                  <Plus size={17} />
                  New Project
                </button>
              )}

            </div>

            <div className="grid lg:grid-cols-[1fr_330px] gap-7">

              {/* PROJECT LIST */}

              <div>

                {filteredProjects.length === 0 ? (

                  <div className="bg-white border border-slate-200 rounded-3xl p-12 sm:p-16 text-center">

                    <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center">

                      <FolderOpen
                        size={30}
                        className="text-blue-500"
                      />

                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 mt-6">
                      {search
                        ? "No projects found"
                        : "Create your first project"}
                    </h2>

                    <p className="mt-3 text-slate-500 max-w-md mx-auto leading-7">

                      {search
                        ? "Try searching with a different project name."
                        : "Create a workspace, upload your PDFs, and start asking questions with AI."}

                    </p>

                    {!search && (
                      <Button
                        onClick={() => setOpenModal(true)}
                        className="mt-7"
                      >
                        <Plus size={18} />
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
                          duration-200
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

              {/* SIDEBAR */}

              <aside className="space-y-5">

                {/* Activity */}

                <div className="bg-white border border-slate-200 rounded-3xl p-6">

                  <div className="flex items-center gap-3">

                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">

                      <Clock
                        size={18}
                        className="text-blue-600"
                      />

                    </div>

                    <div>

                      <h3 className="font-bold text-slate-900">
                        Getting started
                      </h3>

                      <p className="text-xs text-slate-500">
                        Your AI workflow
                      </p>

                    </div>

                  </div>

                  <div className="mt-6 space-y-5">

                    <div className="flex gap-3">

                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">

                        <Upload
                          size={15}
                          className="text-blue-600"
                        />

                      </div>

                      <div>

                        <p className="text-sm font-semibold text-slate-800">
                          Upload a PDF
                        </p>

                        <p className="text-xs text-slate-500 mt-1 leading-5">
                          Add a document to your project.
                        </p>

                      </div>

                    </div>

                    <div className="flex gap-3">

                      <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">

                        <Brain
                          size={15}
                          className="text-purple-600"
                        />

                      </div>

                      <div>

                        <p className="text-sm font-semibold text-slate-800">
                          Ask a question
                        </p>

                        <p className="text-xs text-slate-500 mt-1 leading-5">
                          Let AI search your documents.
                        </p>

                      </div>

                    </div>

                    <div className="flex gap-3">

                      <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">

                        <Sparkles
                          size={15}
                          className="text-emerald-600"
                        />

                      </div>

                      <div>

                        <p className="text-sm font-semibold text-slate-800">
                          Get insights
                        </p>

                        <p className="text-xs text-slate-500 mt-1 leading-5">
                          Find information across your files.
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

                {/* AI TIP */}

                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-6 text-white shadow-lg">

                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10 blur-xl" />

                  <div className="relative">

                    <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">

                      <Sparkles size={20} />

                    </div>

                    <h3 className="text-xl font-bold mt-5">
                      Ask better questions
                    </h3>

                    <p className="text-sm text-blue-100 mt-2 leading-6">
                      Specific questions help AI find more relevant
                      information from your documents.
                    </p>

                    <div className="mt-5 space-y-2">

                      {[
                        "Summarize this document",
                        "What are the key findings?",
                        "List the technical skills",
                      ].map((question) => (

                        <div
                          key={question}
                          className="
                            rounded-xl
                            bg-white/10
                            border
                            border-white/10
                            px-3
                            py-2.5
                            text-xs
                            text-blue-50
                          "
                        >
                          "{question}"
                        </div>

                      ))}

                    </div>

                    <button
                      className="
                        mt-5
                        inline-flex
                        items-center
                        gap-2
                        text-sm
                        font-semibold
                        text-white
                        hover:text-blue-100
                      "
                    >
                      Explore AI
                      <ArrowRight size={16} />
                    </button>

                  </div>

                </div>

              </aside>

            </div>

          </section>

        </div>
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