import React, { useState } from "react";
import { Form, Input, Button, Select, Modal, Space, Row } from "antd";
import { useDispatch } from "react-redux";
import ITask from "../interfaces/task";

interface ICreateTaskForm {
  location: boolean;
}
const CreateTaskForm: React.FunctionComponent<ICreateTaskForm> = (location) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const getDate = () => {
    const dateObj = new Date();
    const date = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
    return `${date}-${month}-${year}`;
  };
  const onSubmit = (formValues: ITask) => {
    formValues.taskId = `TT-${Math.random()}`;
    formValues.status = "todo";
    formValues.createdOn = getDate();
    dispatch({ type: "CREATE_TASK", payload: formValues });
    form.resetFields();
  };
  return (
    <>
      {!location.location && (
        <Row justify="end">
          <Button type="primary" onClick={showModal}>
            Create Task
          </Button>
        </Row>
      )}
      <Modal
        title="Create Task"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          layout="horizontal"
          initialValues={{}}
          onFinish={onSubmit}
          form={form}
        >
          <Form.Item
            name="company"
            label="Company"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="company1">Company 1</Select.Option>
              <Select.Option value="company2">Company 2</Select.Option>
              <Select.Option value="company3">Company 3</Select.Option>
              <Select.Option value="company4">Company 4</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="project"
            label="Project"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="project1">Project 1</Select.Option>
              <Select.Option value="project2">Project 2</Select.Option>
              <Select.Option value="project3">Project 3</Select.Option>
              <Select.Option value="project4">Project 4</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="task" label="Task name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="very low">Very Low</Select.Option>
              <Select.Option value="low">Low</Select.Option>
              <Select.Option value="medium">Medium</Select.Option>
              <Select.Option value="high">High</Select.Option>
              <Select.Option value="very high">Very High</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="description" label="Task Description:">
            <Input.TextArea />
          </Form.Item>
          <Row justify="center">
            <Button htmlType="submit">Submit</Button>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default CreateTaskForm;
