import './App.css'
import { useState } from 'react';
import MenuList from './components/MenuList'
import ProjectComponent from './components/ProjectComponent'
import DashboardLcmComponent from './components/DashboardLcmComponent';
import DashboardConstComponent from './components/DashboardConstComponent';
import SupportComponent from './components/SupportComponent';
import ReleaseComponent from './components/ReleaseComponent';
import DependencyComponent from './components/DependencyComponent';
import DetteTechComponent from './components/DetteTechComponent';
import KPIProdComponent from './components/KPIProdComponent';
import AddProjectComponent from './components/AddProjectComponent';
import Logo from './components/Logo'
import { Layout, theme, Button, Dropdown, Space } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeComponent from './components/HomeComponent';



const { Sider, Header, Content } = Layout;
function App() {
  const [collapsed, setCollapsed] = useState(false);
  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="#" style={{ textDecoration: 'none' }}>
          Setting
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="#" style={{ textDecoration: 'none' }} >
          Log out
        </a>
      ),
    },
  ];


  return (
    <>
      <Layout>
        <Sider collapsed={collapsed}
          collapsible
          trigger={null}
          className='sidebar' theme='light'> <Logo />
          <MenuList />
        </Sider>
        <Layout>
          <Header className='header'>
            <Button type='text'
              className='toggle'
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
                  <Button type='text'
                    icon={<UserOutlined />} />
                </Dropdown>
              </Space>
            </Space>
          </Header>
          <Content> 
            <BrowserRouter>

           
                <Routes>
                <Route path='/' element={<HomeComponent />}></Route>
                <Route path='/dashboard-inLaunch' element={<DashboardLcmComponent />}></Route>
                <Route path='/dashboard-underConstruction' element={<DashboardConstComponent />}></Route>
                <Route path='/support' element={<SupportComponent />}></Route>
                <Route path='/release' element={<ReleaseComponent />}></Route>
                <Route path='/dependency' element={<DependencyComponent />}></Route>
                <Route path='/technical-debt' element={<DetteTechComponent />}></Route>
                <Route path='/kpi-business' element={<KPIProdComponent />}></Route>
                <Route path='/project' element={ <ProjectComponent /> }></Route>
                <Route path='/add-project' element={<AddProjectComponent />}></Route>
                
                </Routes>
            </BrowserRouter>
            
          </Content>
        </Layout>
      </Layout>

    </>
  )
}

export default App
