import React, { useEffect, useState } from 'react'
import { listProjects } from '../services/DashboardEnLanc';
import { deleteProject, listSquadsByDomain } from '../services/Project';
import { DeleteOutlined } from "@ant-design/icons";
import { isAdminUser } from '../services/AuthService';
import { Input, Divider } from 'antd';
import { updateName, updateDescription, updateActualMepDate, updateType,
   updateKpiName, updateLastPhaseDate, updateRemarkOrRiskName
  } from "../services/Project";
import Dropdownessai from "./Dropdownessai";
import AddRemarkOrRisk from './AddRemarkOrRisk';
import AddKpiPilotage from './AddKpiPilotage';



const DashboardLcmComponent = () => {

  const [lcProject, setLcProject] = useState([]);
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
      setLcProject(data);
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
  }, [squads, lcProject]);
  return (
    <div className='container' style={{ paddingTop: '12px' }}>
      <h3 className='text-center'>Sujet en Pilote ou Généralisation</h3>
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
                  <th>Date MEP</th>
                  <th>Phase</th>
                  <th>Date dernière phase</th>
                  <th>KPIs</th>
                  <th>Remarques</th>
                  <th>Type</th>
                  {isAdminUser() && 
                   <th></th>
                  } 
                </tr>
              </thead>
              <tbody>
                {lcProject[squad.id] && lcProject[squad.id].map(
                  project => (
                    <tr key={project.id}>
                      <td><a href={`/project/${project.id}`} style={{ textDecoration: 'none' }}>Projet {project.id}</a></td>
                      <td
                       contentEditable="true"
                       onBlur={(e) => handleUpdate({ handleFc: updateName, id: project.id, value: e.target.textContent.trim()})}
                       suppressContentEditableWarning={true}
                      >{project.name}</td>
                      <td
                      contentEditable="true"
                      onBlur={(e) => handleUpdate({ handleFc: updateDescription, id: project.id, value: e.target.textContent.trim()})}
                      suppressContentEditableWarning={true}
                      >{project.description}</td>
                      <td>
                      {isAdminUser ? 
                      <Input type="date" value={project.actualMepDate} 
                 style={{width: '115px'}}
                 onChange={(e) => handleUpdate({ handleFc: updateActualMepDate, id: project.id, value: e.target.value})}
                />    :  project.actualMepDate}
                        </td>
                      <td>
                      {isAdminUser ? 
                                              <Dropdownessai projectId={project.id} refresh={GetProjects} upPhase={project.phase}/>
                                              :  project.phase ? project.phase.name : "N/A" }
                      </td>
                      <td>
                      {isAdminUser ? 
                      <Input type="date" value={project.lastPhaseDate} 
                       style={{width: '115px'}}
                       onChange={(e) => handleUpdate({ handleFc: updateLastPhaseDate, id: project.id, value: e.target.value})} />
                       :  project.lastPhaseDate}
                       </td>
                      <td>{project.pilotageKpis.map(kpi => (<span key={kpi.id}
                      contentEditable="true"
                      onBlur={(e) => handleUpdate({ handleFc: updateKpiName, id: kpi.id, value: e.target.textContent.trim()})}
                      suppressContentEditableWarning={true}
                      > 
                        {kpi.name}
                        <Divider style={{padding: 3, margin: 0}}/>
                        </span>
                     
                      ))}
                      {isAdminUser && 
                      <AddKpiPilotage refreshProject={GetProjects}
                        projectId={project.id} />
                      }
                      </td>
                      <td>
                        {project.remarks.map((remark) => (
                        <span
                          key={remark.id}
                          contentEditable="true"
                          onBlur={(e) =>
                            handleUpdate({
                              handleFc: updateRemarkOrRiskName,
                              id: remark.id,
                              value: e.target.textContent.trim(),
                            })
                          }
                          suppressContentEditableWarning={true}
                        >
                          {remark.name}
                          <Divider style={{padding: 3, margin: 0}}/>
                        </span>
                      ))}
                      {isAdminUser && 
                      <AddRemarkOrRisk  refreshProject={GetProjects}
                        projectId={project.id} />
                      }
                      </td>
                      <td
                      contentEditable="true"
                      onBlur={(e) => handleUpdate({ handleFc: updateType, id: project.id, value: e.target.textContent.trim()})}
                      suppressContentEditableWarning={true}
                      >{project.type}</td>
                      {isAdminUser() && 
                        <td><DeleteOutlined onClick={() => handleProjectDelete(project.id)} /></td>
                  } 
                    </tr>
                  ))}
              </tbody>
            </table>

          </div>
        )

      )
      }

    </div>
  )
}

export default DashboardLcmComponent