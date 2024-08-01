import "./App.css";
import { useState } from "react";
import MenuList from "./components/MenuList";
import ProjectComponent from "./components/ProjectComponent";
import DashboardLcmComponent from "./components/DashboardLcmComponent";
import DashboardConstComponent from "./components/DashboardConstComponent";
import SupportComponent from "./components/SupportComponent";
import ReleaseComponent from "./components/ReleaseComponent";
import DependencyComponent from "./components/DependencyComponent";
import DetteTechComponent from "./components/DetteTechComponent";
import KPIProdComponent from "./components/KPIProdComponent";
import AddProjectComponent from "./components/AddProjectComponent";
import Logo from "./components/Logo";
import { Layout, theme, Button, Dropdown, Space } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import HomeComponent from "./components/HomeComponent";
import RegisterComponent from "./components/RegisterComponent";
import LoginComponent from "./components/LoginComponent";
import { isUserLoggedIn, logout } from "./services/AuthService"

const { Sider, Header, Content } = Layout;
function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(isUserLoggedIn());
  const [collapsed, setCollapsed] = useState(false);
  //const navigate = useNavigate();
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="#"
          style={{ textDecoration: "none" }}
        >
          Setting
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleLogout}
          style={{ textDecoration: "none" }}
        >
          Log out
        </a>
      ),
    },
  ];
  
  function AuthenticatedRoute({ children }) {
    if (isAuthenticated ) {
      return children;
    }
    return <Navigate to="/" />
  }
  function handleLogout(){
    logout();
    //navigate("/");
    return <Navigate to="/login" />
}
  return (
    <>
      <BrowserRouter>
      <Layout>
        {isAuthenticated && (
          <Sider
            collapsed={collapsed}
            collapsible
            trigger={null}
            className="sidebar"
            theme="light"
          >
            {" "}
            <Logo />
            <MenuList />
          </Sider>
        )}
        <Layout>
          {isAuthenticated && (
            <Header className="header">
              <Button
                type="text"
                className="toggle"
                onClick={() => setCollapsed(!collapsed)}
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              />
              <Space direction="vertical">
                <Space wrap>
                  <Dropdown
                    menu={{
                      items,
                    }}
                    placement="bottomRight"
                    arrow={{
                      pointAtCenter: true,
                    }}
                  >
                    <Button type="text" icon={<UserOutlined />} />
                  </Dropdown>
                </Space>
              </Space>
            </Header>
          )}
          <Content>
            
              <Routes>
                <Route path="/home" element={<HomeComponent />}></Route>
                <Route
                  path="/dashboard-inLaunch"
                  element={<DashboardLcmComponent />}
                ></Route>
                <Route
                  path="/dashboard-underConstruction"
                  element={<DashboardConstComponent />}
                ></Route>
                <Route path="/support" element={<SupportComponent />}></Route>
                <Route path="/release" element={<ReleaseComponent />}></Route>
                <Route
                  path="/dependency"
                  element={<DependencyComponent />}
                ></Route>
                <Route
                  path="/technical-debt"
                  element={<DetteTechComponent />}
                ></Route>
                <Route
                  path="/kpi-business"
                  element={<KPIProdComponent />}
                ></Route>
                <Route path="/project" element={<ProjectComponent />}></Route>
                <Route
                  path="/add-project"
                  element={<AddProjectComponent />}
                ></Route>

                <Route path='/' element={ <LoginComponent />}></Route>
                <Route path='/login' element={ <LoginComponent />}></Route>
                <Route path="/register" element={<RegisterComponent />}></Route>
      
              </Routes>
            
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>  
    </>
  );
}

export default App;
