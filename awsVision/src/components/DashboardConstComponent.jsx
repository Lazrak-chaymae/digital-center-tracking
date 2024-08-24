import React, { useEffect, useState } from 'react'
import { listProjects } from '../services/DashboardEnConst'
import { deleteProject, listSquadsByDomain, updateUpcomingRealization } from '../services/Project'
import { DeleteOutlined } from "@ant-design/icons";
import { Input } from 'antd';
import { isAdminUser } from '../services/AuthService';
import { updateName, updateDescription, updateAllocatedSprintCount, updateCompletionPercentage, updateConsumedSprintCount,
      updateMilestone, updateRemarkOrRiskName, updateType, updateStartDate
    } from "../services/Project";
import Dropdownessai from "./Dropdownessai";

const DashboardConstComponent = () => {
    const [ucProject, setUcProject] = useState([]);
    const [squads, setSquads] = useState([]);
    const domainId = sessionStorage.getItem("domainId");
    
    const GetSquads = async () => {
        try {
            const response = await listSquadsByDomain(domainId);
            setSquads(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const GetProjects = async () => {
        try {
            const data = {};
            for (const squad of squads) {
                const response = await listProjects(squad.id);
                data[squad.id] = response.data;
            }
            setUcProject(data);
        } catch (error) {
            console.error(error);
        }
    }
    const handleProjectDelete = (projectId) => {
         deleteProject(projectId).then((response) => {
             console.log(response.data);
         }).catch((error) => {
            console.error(error);
         })
    }
   
      const handleUpdate = async( { handleFc, id, value, index }) => {
        
        try {
    
        let response;
        if (index !== undefined && index !== null) {
          response = await handleFc(id, index, value);
          console.log(response.data);
        } else {
          response = await handleFc(value, id);
          console.log(response.data);
        }
          
        } catch (error) {
          console.error('Error updating project informations :', error);
        }
      }
    useEffect(() => {
        GetSquads();
    }, []);
    
    useEffect(() => {
        if (squads.length > 0) {
            GetProjects();
        }
    }, [squads, ucProject]);

    return (
        <div className='container' style={{ paddingTop : '12px'}}>

            <h3 className='text-center'>Sujet en cadrage ou en développement</h3>
            {squads.map(
                squad => (
                    <div key={squad.id}>
                        <h4>{squad.name}</h4>
                        <table className='table table-striped table-bordered'>
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Nom</th>
                                    <th>Description</th>
                                    <th>Date début</th>
                                    <th>Budget</th>
                                    <th>Consommé en Sprint</th>
                                    <th>Phase</th>
                                    <th>Fait marquants</th>
                                    <th>Prochain Goal</th>
                                    <th>Type</th>
                                    <th>Remarque et risque</th>
                                    <th>Avancement</th>
                                   {isAdminUser() && 
                                    <th></th>
                                   }

                                </tr>
                            </thead>
                            <tbody>
                                {ucProject[squad.id] && ucProject[squad.id].map(
                                    project => (
                                        
                                        <tr key={project.id}>
                                            <td><a href={`/project/${project.id}`} style={{ textDecoration: 'none' }}>Projet {project.id}</a></td>
                                            <td
                                            contentEditable={isAdminUser ? "true" : "false" }
                                            onBlur={(e) => handleUpdate({ handleFc: updateName, id: project.id, value: e.target.textContent.trim()})}
                                            suppressContentEditableWarning={true}
                                            >{project.name}</td>
                                            <td
                                            contentEditable={isAdminUser ? "true" : "false" }
                                            onBlur={(e) => handleUpdate({ handleFc: updateDescription, id: project.id, value: e.target.textContent.trim()})}
                                            suppressContentEditableWarning={true}
                                            >{project.description}</td>
                                            <td>
                                            {isAdminUser ?  
                                                <Input type="date" value={project.startDate} 
                                                  style={{width: '115px'}}
                                                  onChange={(e) => handleUpdate({ handleFc: updateStartDate, id: project.id, value: e.target.value})}
                                                />
                                                : project.startDate }
                                            </td>
                                            <td
                                            contentEditable={isAdminUser ? "true" : "false" }
                                            onBlur={(e) => handleUpdate({ handleFc: updateAllocatedSprintCount, id: project.id, value: e.target.textContent.trim()})}
                                            suppressContentEditableWarning={true}
                                            >{project.allocatedSprintCount}</td>
                                            <td
                                            contentEditable={isAdminUser ? "true" : "false" }
                                            onBlur={(e) => handleUpdate({ handleFc: updateConsumedSprintCount, id: project.id, value: e.target.textContent.trim()})}
                                            suppressContentEditableWarning={true}
                                            >{project.consumedSprintCount}</td>

                                            <td>
                                            {isAdminUser ? 
                                              <Dropdownessai projectId={project.id} refresh={GetProjects} upPhase={project.phase}/>
                                              :  project.phase ? project.phase.name : "N/A" }
                                              
                                            </td>
                                            <td>{project.milestones.map((milestone, index) => (
                                                <span key={index}
                                                contentEditable={isAdminUser ? "true" : "false" }
                                               onBlur={(e) => handleUpdate({ handleFc: updateMilestone, id: project.id, value: e.target.textContent.trim(), index: index})}
                                               suppressContentEditableWarning={true}
                                                >{milestone}
                                                 <br/>
                                                </span>
                                            ))}</td>
                                            <td>{project.upcomingRealizations.map((realization,index) => (
                                                <span key={index}
                                                contentEditable={isAdminUser ? "true" : "false" }
                                                onBlur={(e) => handleUpdate({ handleFc: updateUpcomingRealization, id: project.id, value: e.target.textContent.trim(), index: index})}
                                                suppressContentEditableWarning={true}
                                                >{realization}
                                                <br />
                                                </span>
                                            ))}</td>
                                            <td
                                            contentEditable={isAdminUser ? "true" : "false" }
                                            onBlur={(e) => handleUpdate({ handleFc: updateType, id: project.id, value: e.target.textContent.trim()})}
                                            suppressContentEditableWarning={true}
                                            >{project.type}</td>
                                            <td>{project.remarks.map((remark) => (
                                                <span key={remark.id}
                                                contentEditable="true"
                                                onBlur={(e) => handleUpdate({ handleFc: updateRemarkOrRiskName, id: remark.id, value: e.target.textContent.trim()})}
                                                suppressContentEditableWarning={true}
                                                >{remark.name}
                                                <br />
                                                </span>
                                            ))}</td>
                                            <td
                                            contentEditable={isAdminUser ? "true" : "false" }
                                            onBlur={(e) => handleUpdate({ handleFc: updateCompletionPercentage, id: project.id, value: e.target.textContent.trim()})}
                                            suppressContentEditableWarning={true}
                                            >{project.completionPercentage}</td>
                                            {isAdminUser() && 
                                               <td><DeleteOutlined onClick={() => handleProjectDelete(project.id)}/></td>
                                            }
                                        </tr>


                                    ))}

                            </tbody>
                        </table>
                    </div>
                )
            )}




        </div>
    )
}

export default DashboardConstComponent