import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/layout/Layout";
import Header from "../components/layout/Header";
import Button from "../components/common/Button";
import ProjectCard from "../projects/ProjectCard";

import { getProjects } from "../services/projectService";
import type { Project } from "../types/project";

export default function Dashboard() {

  const [projects, setProjects] =
    useState<Project[]>([]);

  const navigate = useNavigate();

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

  return (
    <Layout>

      <Header />

      <div className="max-w-7xl mx-auto px-8 py-10">

        <div className="flex justify-between items-center">

          <div>
            <h2 className="text-4xl font-bold">
              Welcome Back 👋
            </h2>

            <p className="text-slate-500 mt-2">
              Manage your AI knowledge projects.
            </p>
          </div>

          <Button>
            + New Project
          </Button>

        </div>

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-8
          mt-10
          "
        >
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() =>
                navigate(`/project/${project.id}`)
              }
            />
          ))}
        </div>

      </div>

    </Layout>
  );
}