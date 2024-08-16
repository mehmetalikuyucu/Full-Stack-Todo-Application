import React, { useState, useEffect } from "react";
import Task from "./Task";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosConfig";

interface Task {
  id: number;
  title: string;
  status: "pending" | "in-progress" | "completed";
  description: string;
  expanded?: boolean;
}

interface TaskListProps {
  backgroundColor: string;
  title: string;
  status: "pending" | "in-progress" | "completed";
}

const TaskList: React.FC<TaskListProps> = ({
  backgroundColor,
  title,
  status,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");
  const [filter, setFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const navigate = useNavigate();
  const tasksPerPage = 10;
  const { get } = useLocalStorage("user");
  useEffect(() => {
    const fetchTasks = async () => {
      const userId = get().id;
      if (!userId) {
        window.localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      const response = await axiosInstance.get("/task", {
        params: {
          userId: userId,
          status,
          title: filter,
          sortOrder: sortOrder,
          sortBy: "createdAt",
          page: currentPage,
          limit: tasksPerPage,
        },
      });
      setTasks(response.data.data);
      setTotalPages(Math.ceil(response.data.property.total / tasksPerPage));
    };

    fetchTasks();
  }, [status, filter, sortOrder, currentPage]);

  useEffect(() => {
    console.log("tasks", tasks);
  }, [tasks]);

  const handleTaskClick = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, expanded: !task.expanded } : task
      )
    );
  };

  const handleDeleteTask = async (taskId: number) => {
    await axiosInstance.delete(`/task/${taskId}`);
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleEditTask = async (
    taskId: number,
    newTitle: string,
    newDescription: string
  ) => {
    const response = await axiosInstance.patch(`/task/${taskId}`, {
      title: newTitle,
      description: newDescription,
    });
    setTasks(tasks.map((task) => (task.id === taskId ? response.data : task)));
  };

  return (
    <div className={`lg:w-1/3 p-4 rounded-lg`} style={{ backgroundColor }}>
      <h2 className="text-xl font-bold mb-2 text-white">{title}</h2>
      <div className="flex mb-2">
        <input
          type="text"
          placeholder="Filter tasks"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded mr-2"
        />
        <button
          onClick={() => setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC")}
          className="p-2 bg-gray-300 rounded"
        >
          Sort {sortOrder === "ASC" ? "⬆️" : "⬇️"}
        </button>
      </div>
      {tasks?.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          onClick={() => handleTaskClick(task.id)}
          onDelete={() => handleDeleteTask(task.id)}
          onEdit={(newTitle, newDescription) =>
            handleEditTask(task.id, newTitle, newDescription)
          }
          expanded={task.expanded || false}
        />
      ))}
      <div className="flex text-white justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 bg-slate-400 rounded"
        >
          {"<"}
        </button>
        <span>
          {" "}
          {currentPage} ... {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 bg-slate-400 rounded"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default TaskList;
