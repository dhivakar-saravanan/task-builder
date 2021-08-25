import React from "react";
import { useSelector } from "react-redux";
import IPage from "../interfaces/page";
import { TaskState } from "../redux/reducer";
import ITask from "../interfaces/task";
import TaskTable from "../components/task-table";

const Done: React.FunctionComponent<IPage> = (props) => {
  let taskData: any = useSelector<TaskState>((state) => state.task);
  taskData = taskData.filter(
    (obj: ITask) =>
      obj.status === "done" &&
      !(obj && Object.keys(obj).length === 0 && obj.constructor === Object)
  );

  return <TaskTable data={taskData} page="done"/>;
};

export default Done;
