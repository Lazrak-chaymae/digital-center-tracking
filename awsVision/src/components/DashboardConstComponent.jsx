import React, { useEffect, useState } from 'react'
import { listProjects } from '../services/DashboardEnConst'
import { deleteProject, listSquadsByDomain } from '../services/Project'
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
    const handleUpdateName = async (e, projectId) => {
        const updatedName = e.target.textContent.trim();
        if (updatedName === '') {
          e.target.classList.add('cell-error');
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
          return;
        }
        try {
          const response = await updateName(updatedName, projectId);
          console.log(response.data);
          e.target.classList.add('cell-success');
          setTimeout(() => {
            e.target.classList.remove('cell-success');
          }, 2000);
        } catch (error) {
          console.error('Error updating Project Name:', error);
          e.target.classList.add('cell-error');
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
        }
      };
      const handleUpdateDescription = async (e, projectId) => {
        const updatedDescription = e.target.textContent.trim();
        try {
          const response = await updateDescription(updatedDescription, projectId);
          console.log(response.data);
          e.target.classList.add('cell-success');
          setTimeout(() => {
            e.target.classList.remove('cell-success');
          }, 2000);
        } catch (error) {
          console.error('Error updating Project Description:', error);
          e.target.classList.add('cell-error');
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
        }
      };
      const handleUpdateStartDate = async (e, projectId) => {
        const updatedStartDate = e.target.value;
        try {
          const response = await updateStartDate(updatedStartDate, projectId);
          console.log(response.data);
          getProject();
          e.target.classList.add('cell-success');
          setTimeout(() => {
            e.target.classList.remove('cell-success');
          }, 2000);
        } catch (error) {
          console.error('Error updating Project Start Date:', error);
          e.target.classList.add('cell-error');
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
        }
      };   
      const handleUpdateAllocatedSprintCount = async (e, projectId) => {
        const updatedValue = e.target.textContent.trim();
        if (updatedValue === '') {
          e.target.classList.add('cell-error');
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
          return;
        }
        try {
          const response = await updateAllocatedSprintCount(updatedValue, projectId);
          console.log(response.data);
          e.target.classList.add('cell-success');
          setTimeout(() => {
            e.target.classList.remove('cell-success');
          }, 2000);
        } catch (error) {
          console.error(`Error updating allocated sprint count:`, error);
          e.target.classList.add('cell-error');
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
        }
      };
      const handleUpdateConsumedSprintCount = async (e, projectId) => {
        const updatedValue = e.target.textContent.trim();
        if (updatedValue === '') {
          e.target.classList.add('cell-error');
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
          return;
        }
        try {
          const response = await updateConsumedSprintCount(updatedValue, projectId);
          console.log(response.data);
          e.target.classList.add('cell-success');
          setTimeout(() => {
            e.target.classList.remove('cell-success');
          }, 2000);
        } catch (error) {
          console.error(`Error updating consumed sprint count:`, error);
          e.target.classList.add('cell-error');
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
        }
      };
      
      const handleUpdateMilestone = async (e, milestoneId, projectId) => {
        const updatedMilestone = e.target.textContent.trim();
        try {
          const response = await updateMilestone(projectId, milestoneId, updatedMilestone);
          console.log(response.data);
          e.target.classList.add('cell-success');
          setTimeout(() => {
            e.target.classList.remove('cell-success');
          }, 2000);
        } catch (error) {
          console.error('Error updating Milestone:', error);
          e.target.classList.add('cell-error');
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
        }
      };
      const handleUpdateRealization = async (e, realizationId, projectId) => {
        const updatedRealization = e.target.textContent.trim();
        try {
          const response = await updateMilestone(projectId, realizationId,  updatedRealization); 
          console.log(response.data);
          e.target.classList.add('cell-success');
          setTimeout(() => {
            e.target.classList.remove('cell-success');
          }, 2000);
        } catch (error) {
          console.error('Error updating Realization:', error);
          e.target.classList.add('cell-error');
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
        }
      };
      const handleUpdateType = async (e, projectId) => {
        const updatedType = e.target.textContent.trim();
        if (updatedType === '') {
          e.target.classList.add('cell-error');
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
          return;
        }
        try {
          const response = await updateType(updatedType, projectId);
          console.log(response.data);
          e.target.classList.add('cell-success');
          setTimeout(() => {
            e.target.classList.remove('cell-success');
          }, 2000);
        } catch (error) {
          console.error('Error updating Project Type:', error);
          e.target.classList.add('cell-error');
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
        }
      };
      const handleUpdateRemarkName = async (e, projectId) => {
        const updatedValue = e.target.textContent.trim();
        if (updatedValue === '') {
          e.target.classList.add('cell-error');
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
          return;
        }
        try {
          const response = await updateRemarkOrRiskName(updatedValue, projectId);
          console.log(response.data);
          e.target.classList.add('cell-success');
          setTimeout(() => {
            e.target.classList.remove('cell-success');
          }, 2000);
        } catch (error) {
          console.error(`Error updating remark or risk name:`, error);
          e.target.classList.add('cell-error');
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
        }
      };
      const handleUpdateCompletionPercentage = async (e, projectId) => {
        const updatedValue = e.target.textContent.trim();
        if (updatedValue === '') {
          e.target.classList.add('cell-error');
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
          return;
        }
        try {
          const response = await updateCompletionPercentage(updatedValue, projectId);
          console.log(response.data);
          e.target.classList.add('cell-success');
          setTimeout(() => {
            e.target.classList.remove('cell-success');
          }, 2000);
        } catch (error) {
          console.error(`Error updating completion percentage:`, error);
          e.target.classList.add('cell-error');
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
        }
      };
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
                                            onBlur={(e) => handleUpdateName(e, project.id)}
                                            suppressContentEditableWarning={true}
                                            >{project.name}</td>
                                            <td
                                            contentEditable={isAdminUser ? "true" : "false" }
                                            onBlur={(e) => handleUpdateDescription(e, project.id)}
                                            suppressContentEditableWarning={true}
                                            >{project.description}</td>
                                            <td>
                                            {isAdminUser ?  
                                                <Input type="date" value={project.startDate} 
                                                  style={{width: '115px'}}
                                                  onChange={(e) => handleUpdateStartDate(e, project.id)}
                                                />
                                                : project.startDate }
                                            </td>
                                            <td
                                            contentEditable={isAdminUser ? "true" : "false" }
                                            onBlur={(e) => handleUpdateAllocatedSprintCount(e, project.id)}
                                            suppressContentEditableWarning={true}
                                            >{project.allocatedSprintCount}</td>
                                            <td
                                            contentEditable={isAdminUser ? "true" : "false" }
                                            onBlur={(e) => handleUpdateConsumedSprintCount(e, project.id)}
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
                                               onBlur={(e) => handleUpdateMilestone(e, index, project.id)}
                                               suppressContentEditableWarning={true}
                                                >{milestone}
                                                 <br/>
                                                </span>
                                            ))}</td>
                                            <td>{project.upcomingRealizations.map((realization,index) => (
                                                <span key={index}
                                                contentEditable={isAdminUser ? "true" : "false" }
                                                onBlur={(e) => handleUpdateRealization(e, index, project.id)}
                                                suppressContentEditableWarning={true}
                                                >{realization}
                                                <br />
                                                </span>
                                            ))}</td>
                                            <td
                                            contentEditable={isAdminUser ? "true" : "false" }
                                            onBlur={(e) => handleUpdateType(e, project.id)}
                                            suppressContentEditableWarning={true}
                                            >{project.type}</td>
                                            <td>{project.remarks.map((remark) => (
                                                <span key={remark.id}
                                                contentEditable="true"
                                                onBlur={(e) => handleUpdateRemarkName(e, remark.id)}
                                                suppressContentEditableWarning={true}
                                                >{remark.name}
                                                <br />
                                                </span>
                                            ))}</td>
                                            <td
                                            contentEditable={isAdminUser ? "true" : "false" }
                                            onBlur={(e) => handleUpdateCompletionPercentage(e, project.id)}
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