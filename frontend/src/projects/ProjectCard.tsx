import { Folder } from "lucide-react";
import Card from "../components/common/Card";
import type { Project } from "../types/project";

interface Props {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({
  project,
  onClick,
}: Props) {
  return (
    <Card
      className="
      cursor-pointer
      hover:shadow-lg
      hover:-translate-y-1
      transition-all
      "
    >
      <div onClick={onClick}>
        <Folder
          className="text-blue-600"
          size={34}
        />

        <h2 className="text-xl font-semibold mt-4">
          {project.name}
        </h2>

        <p className="text-slate-500 mt-2">
          {project.description}
        </p>
      </div>
    </Card>
  );
}