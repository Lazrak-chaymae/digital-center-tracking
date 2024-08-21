import React, { useEffect, useState } from 'react'
import { listProjects } from '../services/DashboardEnLanc';
import { deleteProject, listSquadsByDomain } from '../services/Project';
import { DeleteOutlined } from "@ant-design/icons";
import { isAdminUser } from '../services/AuthService';
import { Input } from 'antd';
import { updateName, updateDescription, updateActualMepDate, updateType,
   updateKpiName, updateLastPhaseDate, updateRemarkOrRiskName
  } from "../services/Project";
import Dropdownessai from "./Dropdownessai";


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
  
  const handleUpdateMepDate = async (e, projectId) => {
    const updatedMepDate = e.target.value;
    try {
      const response = await updateActualMepDate(updatedMepDate, projectId);
      console.log(response.data);
      e.target.classList.add('cell-success');
      setTimeout(() => {
        e.target.classList.remove('cell-success');
      }, 2000);
    } catch (error) {
      console.error('Error updating Project MEP Date:', error);
      e.target.classList.add('cell-error');
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
    }
  };
  
  const handleUpdatePhaseDate = async (e, projectId) => {
    const updatedPhaseDate = e.target.value;
    try {
      const response = await updateLastPhaseDate(updatedPhaseDate, projectId);
      console.log(response.data);
      e.target.classList.add('cell-success');
      setTimeout(() => {
        e.target.classList.remove('cell-success');
      }, 2000);
    } catch (error) {
      console.error('Error updating Project Phase Date:', error);
      e.target.classList.add('cell-error');
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
    }
  };
  const handleUpdateKpiName = async (e, kpiId) => {
    const updatedKpiName = e.target.textContent.trim();
    try {
      const response = await updateKpiName(updatedKpiName, kpiId);
      console.log(response.data);
      e.target.classList.add('cell-success');
      setTimeout(() => {
        e.target.classList.remove('cell-success');
      }, 2000);
    } catch (error) {
      console.error('Error updating KPI Name:', error);
      e.target.classList.add('cell-error');
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
    }
  };
  const handleUpdateRemarkName = async (e, remarkId) => {
    const updatedValue = e.target.textContent.trim();
    if (updatedValue === '') {
      e.target.classList.add('cell-error');
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
      return;
    }
    try {
      const response = await updateRemarkOrRiskName(updatedValue, remarkId);
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
                       onBlur={(e) => handleUpdateName(e, project.id)}
                       suppressContentEditableWarning={true}
                      >{project.name}</td>
                      <td
                      contentEditable="true"
                      onBlur={(e) => handleUpdateDescription(e, project.id)}
                      suppressContentEditableWarning={true}
                      >{project.description}</td>
                      <td>
                      {isAdminUser ? 
                      <Input type="date" value={project.actualMepDate} 
                 style={{width: '115px'}}
                 onChange={(e) => handleUpdateMepDate(e, project.id)}
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
                       onChange={(e) => handleUpdatePhaseDate(e, project.id)} />
                       :  project.lastPhaseDate}
                       </td>
                      <td>{project.pilotageKpis.map(kpi => (<div key={kpi.id}
                      contentEditable="true"
                      onBlur={(e) => handleUpdateKpiName(e, kpi.id)}
                      suppressContentEditableWarning={true}
                      >{kpi.name}</div>))}</td>
                      <td>
                        {project.remarks.map(remark => (
                          <div key={remark.id}
                          contentEditable="true"
                       onBlur={(e) => handleUpdateRemarkName(e, remark.id)}
                       suppressContentEditableWarning={true}
                          >{remark.name}</div>
                        ))}
                      </td>
                      <td
                      contentEditable="true"
                      onBlur={(e) => handleUpdateType(e, project.id)}
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