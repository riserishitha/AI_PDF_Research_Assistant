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

      <div className="bg-slate-50 min-h-screen">

        <div className="max-w-7xl mx-auto px-8 py-8">

          {/* ================= HERO ================= */}

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-800 text-white p-10 shadow-xl">

            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-indigo-400/10 blur-3xl" />

            <div className="relative grid lg:grid-cols-2 gap-10 items-center">

              <div>

                <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm">

                  <Sparkles size={16} />

                  AI Powered Workspace

                </span>

                <h1 className="text-5xl font-bold mt-6 leading-tight">

                  Manage your PDFs

                  <span className="block text-cyan-300">

                    with Artificial Intelligence

                  </span>

                </h1>

                <p className="mt-6 text-blue-100 text-lg max-w-xl leading-8">

                  Upload research papers, resumes, reports and manuals.

                  Ask natural language questions and receive AI-generated

                  answers instantly.

                </p>

                <div className="flex gap-4 mt-8">
<Button
  onClick={() => setOpenModal(true)}
  className="
    bg-blue-500
    hover:bg-blue-400
    text-white
    px-8
    py-4
    rounded-xl
    font-semibold
    shadow-lg
    border
    border-blue-300
    transition-all
    duration-300
    hover:scale-105
  "
>
  <Plus size={20} />

  <span className="ml-2">
    Create Project
  </span>
</Button>

                  <button
                    className="border border-white/30 px-6 rounded-xl hover:bg-white/10 transition"
                  >
                    Learn More
                  </button>

                </div>

              </div>

              <div className="flex justify-center">

                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 w-full max-w-md border border-white/20">

                  <div className="flex justify-between items-center">

                    <h3 className="font-semibold">

                      AI Workspace

                    </h3>

                    <Brain className="text-cyan-300" />

                  </div>

                  <div className="mt-6 space-y-4">

                    <div className="bg-white/10 rounded-xl p-4">

                      📄 Resume.pdf

                    </div>

                    <div className="bg-white/10 rounded-xl p-4">

                      📑 Research.pdf

                    </div>

                    <div className="bg-cyan-400 text-slate-900 rounded-xl p-4 font-semibold">

                      💬 Ask AI Anything...

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* ================= QUICK ACTIONS ================= */}

          <div className="grid md:grid-cols-4 gap-6 mt-10">

            <button
              onClick={() => setOpenModal(true)}
              className="bg-white rounded-2xl border p-6 hover:shadow-lg transition text-left"
            >

              <Plus className="text-blue-600" />

              <h3 className="font-semibold mt-5">

                New Project

              </h3>

              <p className="text-slate-500 mt-2 text-sm">

                Create a new AI workspace.

              </p>

            </button>

            <button
              className="bg-white rounded-2xl border p-6 hover:shadow-lg transition text-left"
            >

              <Upload className="text-green-600" />

              <h3 className="font-semibold mt-5">

                Upload PDFs

              </h3>

              <p className="text-slate-500 mt-2 text-sm">

                Add documents to your projects.

              </p>

            </button>

            <button
              className="bg-white rounded-2xl border p-6 hover:shadow-lg transition text-left"
            >

              <MessageSquare className="text-purple-600" />

              <h3 className="font-semibold mt-5">

                Continue Chat

              </h3>

              <p className="text-slate-500 mt-2 text-sm">

                Resume previous conversations.

              </p>

            </button>

            <button
              className="bg-white rounded-2xl border p-6 hover:shadow-lg transition text-left"
            >

              <FolderOpen className="text-orange-600" />

              <h3 className="font-semibold mt-5">

                Browse Projects

              </h3>

              <p className="text-slate-500 mt-2 text-sm">

                Open an existing workspace.

              </p>

            </button>

          </div>

          {/* ================= STATS ================= */}

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mt-10">

            {[
              {
                icon: FolderOpen,
                title: "Projects",
                value: projects.length,
                color: "blue",
              },
              {
                icon: FileText,
                title: "Documents",
                value: "--",
                color: "green",
              },
              {
                icon: Sparkles,
                title: "AI Chats",
                value: "--",
                color: "purple",
              },
              {
                icon: Database,
                title: "Storage",
                value: "--",
                color: "orange",
              },
            ].map((item) => (

              <div
                key={item.title}
                className="bg-white rounded-2xl border p-6 hover:shadow-lg transition"
              >

                <item.icon
                  size={28}
                  className={`text-${item.color}-600`}
                />

                <p className="mt-6 text-slate-500">

                  {item.title}

                </p>

                <h2 className="text-4xl font-bold mt-2">

                  {item.value}

                </h2>

              </div>

            ))}

          </div>

          {/* ================= SEARCH ================= */}

          <div className="mt-10">

            <div className="bg-white rounded-2xl shadow-sm border p-2 flex items-center">

              <Search
                className="ml-4 text-slate-400"
                size={22}
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search projects..."
                className="flex-1 px-4 py-3 outline-none bg-transparent"
              />

            </div>

          </div>
          {/* ================= PROJECTS ================= */}

          <div className="mt-14">

            <div className="flex items-center justify-between mb-8">

              <div>

                <h2 className="text-3xl font-bold text-slate-900">
                  Your Projects
                </h2>

                <p className="text-slate-500 mt-2">
                  Organize your PDFs into AI-powered workspaces.
                </p>

              </div>

              <div className="flex items-center gap-2 text-slate-500">

                <FolderOpen size={18} />

                <span>
                  {filteredProjects.length} Project
                  {filteredProjects.length !== 1 ? "s" : ""}
                </span>

              </div>

            </div>

            <div className="grid lg:grid-cols-3 gap-8">

              {/* LEFT */}

              <div className="lg:col-span-2">

                {filteredProjects.length === 0 ? (

                  <div className="bg-white rounded-3xl border shadow-sm p-16 text-center">

                    <FolderOpen
                      size={70}
                      className="mx-auto text-slate-300"
                    />

                    <h2 className="text-3xl font-bold mt-8">
                      No Projects Yet
                    </h2>

                    <p className="mt-4 text-slate-500 max-w-md mx-auto leading-7">

                      Create your first project, upload PDFs,
                      and start chatting with your documents
                      using AI.

                    </p>

                    <Button
                      onClick={() => setOpenModal(true)}
                      className="mt-8"
                    >
                      <Plus size={18} />

                      <span className="ml-2">
                        Create First Project
                      </span>

                    </Button>

                  </div>

                ) : (

                  <div className="grid md:grid-cols-2 gap-8">

                    {filteredProjects.map((project) => (

                      <div
                        key={project.id}
                        className="transition hover:-translate-y-1"
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

              {/* RIGHT SIDEBAR */}

              <div className="space-y-6">

                {/* Activity */}

                <div className="bg-white rounded-3xl border shadow-sm p-6">

                  <div className="flex items-center gap-2">

                    <Clock
                      size={20}
                      className="text-blue-600"
                    />

                    <h3 className="font-semibold text-lg">
                      Recent Activity
                    </h3>

                  </div>

                  <div className="space-y-5 mt-6">

                    <div className="flex gap-3">

                      <div className="bg-blue-100 p-2 rounded-xl h-fit">

                        <Upload
                          size={18}
                          className="text-blue-600"
                        />

                      </div>

                      <div>

                        <p className="font-medium">

                          Upload your first PDF

                        </p>

                        <p className="text-sm text-slate-500">

                          Documents become searchable by AI.

                        </p>

                      </div>

                    </div>

                    <div className="flex gap-3">

                      <div className="bg-purple-100 p-2 rounded-xl h-fit">

                        <Brain
                          size={18}
                          className="text-purple-600"
                        />

                      </div>

                      <div>

                        <p className="font-medium">

                          Start chatting

                        </p>

                        <p className="text-sm text-slate-500">

                          Ask questions about uploaded files.

                        </p>

                      </div>

                    </div>

                    <div className="flex gap-3">

                      <div className="bg-green-100 p-2 rounded-xl h-fit">

                        <FileText
                          size={18}
                          className="text-green-600"
                        />

                      </div>

                      <div>

                        <p className="font-medium">

                          AI understands context

                        </p>

                        <p className="text-sm text-slate-500">

                          Semantic search finds relevant answers.

                        </p>

                      </div>

                    </div>

                  </div>

                </div>

                {/* Tips */}

                <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-600 p-6 text-white shadow-lg">

                  <Sparkles size={30} />

                  <h3 className="text-2xl font-bold mt-5">

                    AI Tip

                  </h3>

                  <p className="mt-4 text-blue-100 leading-7">

                    Ask complete questions like:

                  </p>

                  <div className="mt-5 bg-white/10 rounded-2xl p-4 text-sm leading-6">

                    "Summarize this research paper."

                    <br /><br />

                    "List all technical skills from my resume."

                    <br /><br />

                    "What are the key findings?"

                  </div>

                  <button
                    className="
                      mt-6
                      bg-white
                      text-blue-700
                      px-5
                      py-3
                      rounded-xl
                      font-semibold
                      flex
                      items-center
                      gap-2
                      hover:bg-slate-100
                      transition
                    "
                  >

                    Explore AI

                    <ArrowRight size={18} />

                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

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