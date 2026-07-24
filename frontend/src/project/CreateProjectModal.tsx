import { useState } from "react";
import toast from "react-hot-toast";

import Modal from "../components/common/Modal";
import Button from "../components/common/Button";

import { createProject } from "../services/projectService";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateProjectModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleCreate() {
    if (!name.trim()) {
      toast.error("Project name is required");
      return;
    }

    try {
      setLoading(true);

      await createProject({
        name,
        description,
      });

      toast.success("Project created!");

      setName("");
      setDescription("");

      onClose();
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Unable to create project");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <h2 className="text-2xl font-bold mb-6">
        Create New Project
      </h2>

      <input
        placeholder="Project Name"
        className="w-full border rounded-lg p-3 mb-4"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <textarea
        placeholder="Description"
        className="w-full border rounded-lg p-3 h-28 mb-6"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <div className="flex justify-end gap-3">
        <Button
          onClick={onClose}
          className="bg-gray-300 text-black hover:bg-gray-400"
        >
          Cancel
        </Button>

        <Button
          onClick={handleCreate}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </Button>
      </div>
    </Modal>
  );
}