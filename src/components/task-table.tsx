import React, { useState } from "react";
import { Table, Space, Input } from "antd";
import { useDispatch } from "react-redux";
import ITask from "../interfaces/task";
import { useEffect } from "react";

interface ITaskTableProps {
  data: ITask[];
  page: string;
}
const TaskTable: React.FunctionComponent<ITaskTableProps> = (data) => {
  const [value, setValue] = useState("");
  const [dataSource, setDataSource]: any = useState();
  useEffect(() => setDataSource(data.data), [data.data]);
  const dispatch = useDispatch();
  const page = data.page;
  const handleStartTask = (record: ITask) => {
    dispatch({ type: "START_TASK", payload: record.taskId });
  };

  const getDate = () => {
    const dateObj = new Date();
    const date = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
    return `${date}-${month}-${year}`;
  };
  const handleInProgress = (record: ITask) => {
    record.completedOn = getDate();
    dispatch({ type: "FINISH_TASK", payload: record });
  };
  const handleRemoveTask = (record: ITask) => {
    dispatch({ type: "DELETE_TASK", payload: record.taskId });
  };
  const renderActionButton = (status: string, record: ITask) => {
    switch (status) {
      case "todo":
        return <a onClick={() => handleStartTask(record)}>Start Task</a>;
      case "in progress":
        return <a onClick={() => handleInProgress(record)}>Complete Task</a>;
      case "done":
        return <p>Completed</p>;
    }
  };
  const FilterByNameInput = (e: any) => {
    const currValue = e.target.value;
    setValue(currValue);
    const filteredData = data.data.filter((entry) => {
      return (
        entry.project.includes(currValue) || entry.taskId.includes(currValue)
      );
    });
    setDataSource(filteredData);
  };
  const columns = [
    {
      title: "Task ID",
      dataIndex: "taskId",
      key: "taskId",
    },
    {
      title: page === "done" ? "Company" : "",
      dataIndex: page === "done" ? "company" : "",
      key: page === "done" ? "company" : "",
    },
    {
      title: "Task Name",
      dataIndex: "task",
      key: "task",
    },
    {
      title: "Project",
      dataIndex: "project",
      key: "project",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
    },
    {
      title: page !== "done" ? "Action" : "Created On",
      dataIndex: page !== "done" ? "status" : "createdOn",
      key: page !== "done" ? "action" : "createdOn",
      render: (text: string, record: ITask) => (
        <Space size="middle">
          {page !== "done" ? renderActionButton(text, record) : text}
        </Space>
      ),
    },
    {
      title: page !== "done" ? "Remove" : "Completed On",
      dataIndex: page !== "done" ? "" : "completedOn",
      key: page !== "done" ? "remove" : "completedOn",
      render: (text: string, record: ITask) => (
        <Space size="middle">
          {page !== "done" ? (
            <a onClick={() => handleRemoveTask(record)}>Remove</a>
          ) : (
            <p>{text}</p>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Space size="large" align="start" direction="vertical">
      <Space size="large" align="end" direction="vertical">
        <Input
          placeholder="Search Name"
          value={value}
          onChange={(e) => FilterByNameInput(e)}
        />
      </Space>
      <Space size="large" align="start" direction="vertical">
        <Table columns={columns} dataSource={dataSource} />
      </Space>
    </Space>
  );
};

export default TaskTable;
