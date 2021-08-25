import React from "react";
import { Link } from "react-router-dom";
import { Menu, Layout, Button, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "../styles/home.css";
import { Switch } from "react-router-dom";
import {
  FieldTimeOutlined,
  CheckOutlined,
  ExclamationOutlined,
  LogoutOutlined,
  HomeOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import IPage from "../interfaces/page";
import PrivateRoute from "../config/private-route";
import routes from "../config/routes";
import CreateTaskForm from "../components/create-task-form";
import { TaskState } from "../redux/reducer";

const Home: React.FunctionComponent<IPage> = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isDonePage, setIsDonePage] = useState(false);
  const { Header, Content, Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const state = useSelector<TaskState>((state) => state);
  const handleLogout = () => {
    dispatch({ type: "USER_LOGOUT", payload: "" });
    history.push("/");
  };
  const handleDonePage = () => {
    setIsDonePage(true);
  }

  const handlePageChange = () => {
    setIsDonePage(false);
  }
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div>
          <h1 className="page-title">Task Tracker</h1>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link onClick={handlePageChange}to="/home">Home</Link>
          </Menu.Item>
          <Menu.Item key="todo" icon={<ExclamationOutlined />}>
            <Link onClick={handlePageChange}to="/to-do">To Do</Link>
          </Menu.Item>
          <Menu.Item key="in progress" icon={<FieldTimeOutlined />}>
            <Link onClick={handlePageChange}to="/in-progress">In Progress</Link>
          </Menu.Item>
          <Menu.Item key="done" icon={<CheckOutlined />}>
            <Link onClick={handleDonePage} to="/done">Done</Link>
          </Menu.Item>
          <Menu.Item key="sub0" icon={<LogoutOutlined />}>
            <Button type="link" onClick={handleLogout}>
              Logout
            </Button>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <MenuOutlined onClick={toggle} />
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <CreateTaskForm location={isDonePage}/>
          <Space direction="vertical">
            <Switch>
              {routes.map((route, index) => {
                return (
                  <PrivateRoute
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                  >
                    <route.component {...props} {...route.props} />
                  </PrivateRoute>
                );
              })}
            </Switch>
          </Space>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
