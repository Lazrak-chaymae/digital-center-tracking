import React from 'react'
import { Menu } from 'antd'
import { HomeOutlined, AppstoreOutlined , FileAddOutlined, BarsOutlined} from '@ant-design/icons'

const MenuList = () => {
    
  return (
     <Menu theme='light' mode='inline' className='menu-bar'>
        <Menu.Item key="home" icon={<HomeOutlined />} >Home</Menu.Item>
        <Menu.SubMenu 
        key='dashboard' 
        icon={<AppstoreOutlined />} 
        title="Dashboard">
            <Menu.Item key="dashboard-1"><a href='/dashboard-underConstruction' style={{ textDecoration: 'none' }}>Dashboard en construction</a></Menu.Item>
            <Menu.Item key="dashboard-2"><a href='/dashboard-inLaunch' style={{ textDecoration: 'none' }}>Dashboard en lancement</a></Menu.Item>
            <Menu.Item key="dashboard-3"><a href='/technical-debt' style={{ textDecoration: 'none' }}>Dette Technique</a></Menu.Item>
            <Menu.Item key="dashboard-4"><a href='/support' style={{ textDecoration: 'none' }}>Support Niveau 3</a></Menu.Item>
            <Menu.Item key="dashboard-5"><a href='/kpi-business' style={{ textDecoration: 'none' }}>KPI Business</a></Menu.Item>
            <Menu.Item key="dashboard-6"><a href='/release' style={{ textDecoration: 'none' }}>Releases</a></Menu.Item>
            <Menu.Item key="dashboard-7"><a href='/dependancy' style={{ textDecoration: 'none' }}>Dépendances</a></Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key='projects' icon={<BarsOutlined />} title="Projets">
        <Menu.Item key="projet-1"><a href='/project' style={{ textDecoration: 'none' }}>Projet 1</a></Menu.Item>
        <Menu.Item key="projet-2"><a href='/project' style={{ textDecoration: 'none' }}>Projet 2</a></Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="addProject" icon={<FileAddOutlined />}>
        <a href='/add-project' style={{ textDecoration: 'none' }} >Add project</a>
            
        </Menu.Item>
     </Menu>
  )
}

export default MenuList