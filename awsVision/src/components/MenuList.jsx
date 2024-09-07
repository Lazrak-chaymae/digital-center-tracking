import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  FileAddOutlined,
  BarsOutlined,
  CheckCircleOutlined 
} from "@ant-design/icons";
import { listProjects } from "../services/Project";
import { isAdminUser } from "../services/AuthService";

const MenuList = () => {
  const [projects, setProjects] = useState([]);
  const domainId = sessionStorage.getItem("domainId");

  const getAllProjects = () => {
    listProjects(domainId)
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getAllProjects();
  }, []);
  return (
    <Menu theme="light" mode="inline" className="menu-bar" style={{backgroundColor: '#dddfe3'}}
      
    >
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <a href="/home" style={{ textDecoration: "none" }}>
          Home
        </a>
      </Menu.Item>
      <Menu.SubMenu
        key="dashboard"
        icon={<AppstoreOutlined />}
        title="Dashboard"
        
      >
        <Menu.Item key="dashboard-1">
          <a
            href="/dashboard-underConstruction"
            style={{ textDecoration: "none" }}
          >
          En construction
          </a>
        </Menu.Item>
        <Menu.Item key="dashboard-2">
          <a href="/dashboard-inLaunch" style={{ textDecoration: "none" }}>En lancement</a>
        </Menu.Item>
        <Menu.Item key="dashboard-3">
          <a href="/technical-debt" style={{ textDecoration: "none" }}>
            Dette Technique
          </a>
        </Menu.Item>
        <Menu.Item key="dashboard-4">
          <a href="/support" style={{ textDecoration: "none" }}>
            Support N3
          </a>
        </Menu.Item>
        <Menu.Item key="dashboard-5">
          <a href="/kpi-business" style={{ textDecoration: "none" }}>
            KPI Business
          </a>
        </Menu.Item>
        <Menu.Item key="dashboard-6">
          <a href="/release" style={{ textDecoration: "none" }}>
            Releases
          </a>
        </Menu.Item>
        <Menu.Item key="dashboard-7">
          <a href="/dependency" style={{ textDecoration: "none" }}>
            Dépendances
          </a>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="projects" icon={<BarsOutlined />} title="Projets">
        {projects.map((project) => (
          <Menu.Item key={project.id}>
            <a
              href={`/project/${project.id}`}
              style={{ textDecoration: "none" }}
            >
              {project.name}
            </a>
          </Menu.Item>
        ))}
      </Menu.SubMenu>
      <Menu.Item key="todo" icon={<CheckCircleOutlined />}>
          <a href="/todo" style={{ textDecoration: "none" }}>
            Todos
          </a>
        </Menu.Item>
      {isAdminUser() && (
        <Menu.Item key="addProject" icon={<FileAddOutlined />}>
          <a href="/add-project" style={{ textDecoration: "none" }}>
            Ajouter projet
          </a>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default MenuList;
