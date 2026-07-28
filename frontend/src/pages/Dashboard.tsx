import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  FolderOpen,
  FileText,
  Sparkles,
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

        {/* Welcome */}

        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">

          <div>

            <h1 className="text-5xl font-bold text-slate-900">
              AI Research Workspace
            </h1>

            <p className="mt-3 text-lg text-slate-500">
              Upload PDFs, organize research, and chat with your documents.
            </p>

          </div>

          <Button
            onClick={() => setOpenModal(true)}
          >
            <Plus size={18} />
            <span className="ml-2">
              New Project
            </span>
          </Button>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          <div className="bg-white rounded-2xl shadow p-6">

            <FolderOpen
              className="text-blue-600"
              size={30}
            />

            <h3 className="mt-4 text-slate-500">
              Total Projects
            </h3>

            <p className="text-3xl font-bold mt-2">
              {projects.length}
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <FileText
              className="text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-slate-500">
              PDFs Uploaded
            </h3>

            <p className="text-3xl font-bold mt-2">
              --
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <Sparkles
              className="text-purple-600"
              size={30}
            />

            <h3 className="mt-4 text-slate-500">
              AI Conversations
            </h3>

            <p className="text-3xl font-bold mt-2">
              --
            </p>

          </div>

        </div>

        {/* Search */}

        <div className="relative mt-10">

          <Search
            className="absolute left-4 top-3 text-slate-400"
            size={20}
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search projects..."
            className="
            w-full
            rounded-xl
            border
            pl-12
            pr-4
            py-3
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            "
          />

        </div>

        {/* Projects */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-6">
            Your Projects
          </h2>

          {filteredProjects.length === 0 ? (

            <div className="bg-white rounded-2xl shadow p-16 text-center">

              <FolderOpen
                size={60}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-6 text-2xl font-semibold">

                No Projects Yet

              </h3>

              <p className="mt-2 text-slate-500">

                Create your first AI workspace.

              </p>

              <Button
                onClick={() => setOpenModal(true)}
                className="mt-8"
              >
                Create Project
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