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
import SettingComponent from "./components/SettingComponent";
import Logo from "./components/Logo";
import { Layout, theme, Button, Dropdown, Space } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import HomeComponent from "./components/HomeComponent";
import RegisterComponent from "./components/RegisterComponent";
import LoginComponent from "./components/LoginComponent";
import { isUserLoggedIn, logout } from "./services/AuthService"
import awbLogo from './assets/awblogo.png';

const { Sider, Header, Content } = Layout;
function App() {
  const isAuthenticated = isUserLoggedIn();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  console.log(isUserLoggedIn());

  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={()=> navigate("/setting")}
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
  const contentStyle = {
    minHeight: '498px',
    backgroundColor: 'white' ,
  
  }
  const mainStyle = {

    marginLeft: collapsed ? '80px' : '200px',
  };
  
 
  function AuthenticatedRoute({ children }) {
    //const Authenticated = isUserLoggedIn();
    if (!isUserLoggedIn()) {
      console.log("User is not authenticated, redirecting to login");
      return <Navigate to="/login" replace />; 
    }
    return children ;
    
  }
 
  function handleLogout(){
    logout();
    console.log("is log out"); 
    navigate("/login");
  }
  
  return (
    <>
    
    {isUserLoggedIn() ? (
      <Layout>
      
          <Sider
            collapsed={collapsed}
            collapsible
            trigger={null}
            className="sidebar"
            theme="light"
            style={{position: 'fixed', backgroundColor: '#FFF8E1'}}
          >
            {" "}
            <Logo />
            <MenuList />
          </Sider>
        
        <Layout className="main-content" style={mainStyle}>
         
            <Header className="header" style={{backgroundColor: '#FFF8E1'}}>
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
          
         
          <Content style={contentStyle}>
            
            <Routes>
                {/* <Route path="/home" element={
                  <AuthenticatedRoute><HomeComponent /></AuthenticatedRoute>
                  }></Route> */}
                  <Route path="/home" element={
                  isUserLoggedIn() ? <HomeComponent /> : <Navigate to="/login" />
                  }></Route>
                  
                <Route
                  path="/dashboard-inLaunch"
                  element={ <AuthenticatedRoute><DashboardLcmComponent /></AuthenticatedRoute>}
                ></Route>
                <Route
                  path="/dashboard-underConstruction"
                  element={<AuthenticatedRoute><DashboardConstComponent /></AuthenticatedRoute>}
                ></Route>
                <Route path="/support" element={<AuthenticatedRoute><SupportComponent /></AuthenticatedRoute>}></Route>
                <Route path="/release" element={<AuthenticatedRoute><ReleaseComponent /></AuthenticatedRoute>}></Route>
                <Route
                  path="/dependency"
                  element={<AuthenticatedRoute><DependencyComponent /></AuthenticatedRoute>}
                ></Route>
                <Route
                  path="/technical-debt"
                  element={<AuthenticatedRoute><DetteTechComponent /></AuthenticatedRoute>}
                ></Route>
                <Route
                  path="/kpi-business"
                  element={<AuthenticatedRoute><KPIProdComponent /></AuthenticatedRoute>}
                ></Route>
                <Route path="/project/:id" element={<AuthenticatedRoute><ProjectComponent /></AuthenticatedRoute>}></Route>
                <Route
                  path="/add-project"
                  element={<AuthenticatedRoute><AddProjectComponent /></AuthenticatedRoute>}
                ></Route>
                <Route path="/setting" element={<SettingComponent />}></Route>
         
                </Routes>
            
          </Content>
        </Layout>
      </Layout>
    ) :
    (
      <Layout style={{backgroundColor: 'white'}}>
        <Header  className="header-login">
           <img src={awbLogo} className="logo-login"/>
        </Header>
        <Content className="content">
        <Routes>
    <Route path='/' element={ <LoginComponent />}></Route>
                <Route path='/login' element={ <LoginComponent />}></Route>
                <Route path="/register" element={<RegisterComponent />}></Route>
    </Routes>
        </Content>
      </Layout>
   
    ) }
    </>
  );
}

export default App;
