import React, { useState } from "react";
import { Card, Button, Input } from "antd";
import { MenuOutlined, CalendarOutlined } from "@ant-design/icons";
import { updatePhase } from "../services/Project";



const ProjectCard = ({
  id,
  name,
  status,
  phase,
  squad,
  date,
  refreshProject,
}) => {
     const [editingPhase, setEditingPhase] = useState(false);
     const [updatedPhase, setUpdatedPhase] = useState(phase);
    
     const handlePhaseChange = (e) => {
        setUpdatedPhase(e.target.innerText);
      };
    
      const handlePhaseBlur = async () => {
        if (updatedPhase !== phase) {
          try {
            await updatePhase(updatedPhase, id);
            console.log("Phase updated");
            refreshProject();
          } catch (error) {
            console.error('There was an error updating the phase:', error);
          }
        }
        setEditingPhase(false);
      };

 
  return (
    <Card title={name} bordered={false} className="custom-card text-center" key={id} >
      <div className="info-row">
        <MenuOutlined className="icon" /> <span className="label">Statut</span>
        <Button className="square-button">{status}</Button>
      </div>
     
      <div className="info-row">
                <MenuOutlined className="icon" /> <span className="label">Phase</span>
                <Button className="square-button" 
                contentEditable={editingPhase}
                suppressContentEditableWarning={true}
                onBlur={handlePhaseBlur}
                onClick={() => setEditingPhase(true)}
                onInput={handlePhaseChange}
                contenteditable="true">{updatedPhase ? updatedPhase.name : "N/A"}</Button>
      </div>
      <div className="info-row">
        <MenuOutlined className="icon" /> <span className="label">Squad</span>
        <Button className="square-button">{squad ? squad.name : "N/A"}</Button>
      </div>
      <div className="info-row">
        <CalendarOutlined className="icon" />
        <span className="label">Date début</span>
        <Button className="square-button">{date ? date : "N/A"}</Button>
      </div>
      <div className="info-row">
        <CalendarOutlined className="icon" />
        <span className="label">Date fin</span>
        <Button className="square-button">{date ? date : "N/A"}</Button>
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
