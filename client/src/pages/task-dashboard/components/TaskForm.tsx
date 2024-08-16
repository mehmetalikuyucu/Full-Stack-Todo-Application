import React from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../../axiosConfig";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

interface TaskFormProps {
  toggleRefreshTaskList: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ toggleRefreshTaskList }) => {
  const { register, handleSubmit, reset } = useForm<{
    title: string;
    description: string;
  }>();
  const user = useLocalStorage("user").get();
  const navigate = useNavigate();

  const onSubmit = async (data: { title: string; description: string }) => {
    toggleRefreshTaskList();
    if (!user) {
      window.localStorage.removeItem("token");
      navigate("/signin");
      return;
    }
    await axiosInstance.post("/task", { ...data, userId: user.id });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full items-center flex justify-center"
    >
      <div className="p-4 rounded-lg bg-slate-900 lg:w-1/3 shadow-md max-w-md">
        <div className="text-xl font-bold mb-4 text-white">Add Task</div>
        <input
          {...register("title", { required: true })}
          type="text"
          placeholder="Task title"
          className="p-2 border rounded mb-2 w-full"
        />
        <input
          {...register("description", { required: true })}
          type="text"
          placeholder="Description"
          className="p-2 border rounded mb-4 w-full"
        />
        <button
          type="submit"
          className="p-2 bg-teal-700 text-white w-full rounded"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
