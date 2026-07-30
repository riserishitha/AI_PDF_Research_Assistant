import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  FolderOpen,
  FileText,
  Sparkles,
  Database,
  Plus,
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

      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* HERO */}

        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-8">

            <div>

              <p className="uppercase tracking-widest text-blue-100 text-sm">
                Welcome Back 👋
              </p>

              <h1 className="text-5xl font-bold mt-3 leading-tight">
                AI Research Workspace
              </h1>

              <p className="mt-5 text-blue-100 max-w-2xl text-lg">
                Upload PDFs, organize research papers, resumes,
                reports, and chat with your documents using AI.
              </p>

            </div>

            <Button
              onClick={() => setOpenModal(true)}
              className="bg-white text-blue-700 hover:bg-slate-100 font-semibold px-8 py-4 rounded-xl"
            >
              <Plus size={20} />
              <span className="ml-2">
                New Project
              </span>
            </Button>

          </div>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

          <div className="bg-white rounded-2xl shadow-sm border p-6">

            <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
              <FolderOpen className="text-blue-600" />
            </div>

            <p className="text-slate-500 mt-5">
              Projects
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {projects.length}
            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6">

            <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
              <FileText className="text-green-600" />
            </div>

            <p className="text-slate-500 mt-5">
              Documents
            </p>

            <h2 className="text-4xl font-bold mt-2">
              --
            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6">

            <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center">
              <Sparkles className="text-purple-600" />
            </div>

            <p className="text-slate-500 mt-5">
              AI Chats
            </p>

            <h2 className="text-4xl font-bold mt-2">
              --
            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6">

            <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center">
              <Database className="text-orange-600" />
            </div>

            <p className="text-slate-500 mt-5">
              Storage Used
            </p>

            <h2 className="text-4xl font-bold mt-2">
              --
            </h2>

          </div>

        </div>

        {/* SEARCH */}

        <div className="mt-10">

          <div className="relative">

            <Search
              size={20}
              className="absolute left-5 top-4 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your AI projects..."
              className="
                w-full
                bg-white
                border
                rounded-2xl
                py-4
                pl-14
                pr-5
                shadow-sm
                focus:ring-2
                focus:ring-blue-500
                focus:outline-none
              "
            />

          </div>

        </div>

        {/* PROJECTS */}

        <div className="mt-12">

          <div className="flex justify-between items-center mb-8">

            <h2 className="text-3xl font-bold">
              Your Projects
            </h2>

            <p className="text-slate-500">
              {filteredProjects.length} Project(s)
            </p>

          </div>

          {filteredProjects.length === 0 ? (

            <div className="bg-white rounded-3xl border shadow-sm p-20 text-center">

              <FolderOpen
                size={70}
                className="mx-auto text-slate-300"
              />

              <h2 className="text-3xl font-bold mt-8">

                No Projects Yet

              </h2>

              <p className="text-slate-500 mt-4 max-w-md mx-auto">

                Create your first AI workspace and start uploading
                documents to chat with them using AI.

              </p>

              <Button
                onClick={() => setOpenModal(true)}
                className="mt-8"
              >
                Create First Project
              </Button>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

              {filteredProjects.map((project) => (

                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() =>
                    navigate(`/project/${project.id}`)
                  }
                />

              ))}

            </div>

          )}

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