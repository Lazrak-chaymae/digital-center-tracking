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
            <Menu.Item key="dashboard-1"><a href='/dashboard-underConstruction'>Dashboard en construction</a></Menu.Item>
            <Menu.Item key="dashboard-2"><a href='/dashboard-inLaunch'>Dashboard en lancement</a></Menu.Item>
            <Menu.Item key="dashboard-3"><a href='/technical-debt'>Dette Technique</a></Menu.Item>
            <Menu.Item key="dashboard-4"><a href='/support'>Support Niveau 3</a></Menu.Item>
            <Menu.Item key="dashboard-5"><a href='/kpi-business'>KPI Business</a></Menu.Item>
            <Menu.Item key="dashboard-6"><a href='/release'>Releases</a></Menu.Item>
            <Menu.Item key="dashboard-7"><a href='/dependency'>Dépendances</a></Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key='projects' icon={<BarsOutlined />} title="Projets">
        <Menu.Item key="projet-1"><a href='/project' >Projet 1</a></Menu.Item>
        <Menu.Item key="projet-2"><a href='/project' >Projet 2</a></Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="addProject" icon={<FileAddOutlined />}>
        <a href='/add-project' >Add project</a>
            
        </Menu.Item>
     </Menu>
  )
}

export default MenuList