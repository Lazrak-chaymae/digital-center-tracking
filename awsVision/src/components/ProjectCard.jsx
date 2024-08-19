import React, { useEffect } from "react";
import { Card, Button } from "antd";
import { MenuOutlined, CalendarOutlined } from "@ant-design/icons";
import Dropdownessai from "./Dropdownessai";
import DropDownSquad from "./DropDownSquad";

const ProjectCard = ({
  id,
  name,
  status,
  phase,
  squad,
  startDate,
  expectedEndDate,
  refreshProject,
}) => {
     
  return (
    <Card title={name} bordered={false} className="custom-card text-center" key={id} >
      <div className="info-row">
        <MenuOutlined className="icon" /> <span className="label">Statut</span>
        <Button className="square-button">{status}</Button>
      </div>
     
      <div className="info-row">
             <MenuOutlined className="icon" /> <span className="label">Phase</span> 
             <Dropdownessai projectId={id} refresh={refreshProject} upPhase={phase}/>
      </div>
      <div className="info-row">
        <MenuOutlined className="icon" /> <span className="label">Squad</span>
        <DropDownSquad  projectId={id} refresh={refreshProject}  upSquad={squad}/>
      </div>
      <div className="info-row">
        <CalendarOutlined className="icon" />
        <span className="label">Date début</span>
        <Button className="square-button">{startDate ? startDate : "N/A"}</Button>
      </div>
      <div className="info-row">
        <CalendarOutlined className="icon" />
        <span className="label">Date fin</span>
        <Button className="square-button">{expectedEndDate ? expectedEndDate : "N/A"}</Button>
      </div>
      <div className="details-link">
        <Button type="link" href={`/project/${id}`}>
          Details
        </Button>
      </div>
      
    </Card>
  );
};

export default ProjectCard;
