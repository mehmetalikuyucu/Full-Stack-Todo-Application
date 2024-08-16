import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const Dashboard: React.FC = () => {
  const [refreshTaskList, setRefreshTaskList] = useState<boolean>(false);
  const toggleRefreshTaskList = () => {
    setRefreshTaskList(!refreshTaskList);
  };

  return (
    <div className="p-6 w-full flex items-center flex-col">
      <TaskForm toggleRefreshTaskList={toggleRefreshTaskList} />
      <div className="flex lg:flex-row flex-col gap-2 mt-4">
        <TaskList backgroundColor="#FF8343" title="To Do" status="pending" />
        <TaskList
          backgroundColor="#5B99C2"
          title="In Progress"
          status="in-progress"
        />
        <TaskList backgroundColor="#50B498" title="Done" status="completed" />
      </div>
    </div>
  );
};

export default Dashboard;
