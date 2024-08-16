import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import { GrEdit } from "react-icons/gr";
interface TaskProps {
  id: number;
  title: string;
  description: string;
  onClick: () => void;
  onDelete: () => void;
  onEdit: (newTitle: string, newDescription: string) => void;
  expanded: boolean;
}

const Task: React.FC<TaskProps> = ({
  id,
  title,
  description,
  onClick,
  onDelete,
  onEdit,
  expanded,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const handleEdit = () => {
    onEdit(newTitle, newDescription);
    setIsEditing(false);
  };

  return (
    <div className="mb-2">
      <div
        className="p-2 bg-white rounded shadow cursor-pointer flex justify-between"
        onClick={onClick}
      >
          <>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="p-1 border rounded "
            />
            <button onClick={handleEdit} className="text-blue-500">
              <TiTickOutline/>
            </button>
          </>
        <button onClick={onDelete} className="text-red-500">
          <MdDeleteForever/>
        </button>
      </div>
      {expanded && (
        <div className="mt-2 p-2 bg-gray-200 rounded">
          
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="p-1 border rounded w-full"
            />
          
        </div>
      )}
    </div>
  );
};

export default Task;
