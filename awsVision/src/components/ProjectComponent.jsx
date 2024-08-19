import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { DetailProject, updateStartDate } from "../services/Project";
import { useParams } from "react-router-dom";
import AddKpiPilotage from "./AddKpiPilotage";
import AddRemarkOrRisk from "./AddRemarkOrRisk";
import AddMilestone from "./AddMilestone";
import AddRealization from "./AddRealization";
import { isAdminUser } from '../services/AuthService';
import { listEtapes } from "../services/Etape";
import { listTasks } from "../services/Task";
import AddEtape from "./AddEtape";
import AddTask from "./AddTask";
import { updateName, updateDescription, updateActualMepDate, updateAllocatedSprintCount, updateCompletionPercentage, updateConsumedSprintCount,
updateExpectedDate, updateKpiCurrent, updateKpiName, updateKpiTarget, updateLastPhaseDate, updateMilestone, updateOwner,
updateRemarkOrRiskImportance, updateRemarkOrRiskName
} from "../services/Project";

import { updateTaskName, updateTaskProgress } from "../services/Task";
import { updateEtape } from "../services/Etape";


const ProjectComponent = () => {
  const [project, setProject] = useState({});
  const [etapes, setEtapes] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('');
  const domainId = sessionStorage.getItem("domainId");
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectResponse = await DetailProject(id);
        setProject(projectResponse.data);
        setStatus(project.status);
        console.log(status);
        
        const etapesResponse = await listEtapes(domainId);
        setEtapes(etapesResponse.data);

        const tasksData = {};
        for (const etape of etapesResponse.data) {
          const tasksResponse = await listTasks(id, etape.id);
          tasksData[etape.id] = tasksResponse.data;
        }
        setTasks(tasksData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id, status]);

  const getProject = () => {
    DetailProject(id)
      .then((response) => {
        setProject(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
 
  const getEtapes = () => {
    listEtapes(domainId)
    .then((response) => {
        setEtapes(response.data);
    })
    .catch((error) => {
       console.error(error);
    })
  }
  const getTasks = async () => {
    try {
      const data = {};
      for (const etape of etapes) {
          const response = await listTasks(id,etape.id);
          data[etape.id] = response.data;
      }
      setTasks(data);
  } catch (error) {
      console.error(error);
  }
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
  
  const handleUpdateOwner = async (e, projectId) => {
    const updatedOwner = e.target.textContent.trim();
    try {
      const response = await updateOwner(updatedOwner, projectId);
      console.log(response.data);
      e.target.classList.add('cell-success');
      setTimeout(() => {
        e.target.classList.remove('cell-success');
      }, 2000);
    } catch (error) {
      console.error('Error updating Project Owner:', error);
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
  
  const handleUpdateEndDate = async (e, projectId) => {
    const updatedEndDate = e.target.value;
    try {
      const response = await updateExpectedDate(updatedEndDate, projectId);
      console.log(response.data);
      getProject();
      e.target.classList.add('cell-success');
      setTimeout(() => {
        e.target.classList.remove('cell-success');
      }, 2000);
    } catch (error) {
      console.error('Error updating Project End Date:', error);
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
      getProject();
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
      getProject();
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
  
  const handleUpdateEtape = async (etapeId, e) => {
    const updatedEtape = e.target.textContent.trim();
    try {
      const response = await updateEtape(etapeId, updatedEtape);
      console.log(response.data);
      e.target.classList.add('cell-success');
      setTimeout(() => {
        e.target.classList.remove('cell-success');
      }, 2000);
    } catch (error) {
      console.error('Error updating Etape:', error);
      e.target.classList.add('cell-error');
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
    }
  };
  
  const handleUpdateTaskName = async (taskId, e) => {
    const updatedTaskName = e.target.textContent.trim();
    try {
      const response = await updateTaskName(taskId, updatedTaskName);
      console.log(response.data);
      e.target.classList.add('cell-success');
      setTimeout(() => {
        e.target.classList.remove('cell-success');
      }, 2000);
    } catch (error) {
      console.error('Error updating Task Name:', error);
      e.target.classList.add('cell-error');
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
    }
  };
  
  const handleUpdateTaskProgress = async (taskId, e) => {
    const updatedTaskProgress = e.target.textContent.trim();
    try {
      const response = await updateTaskProgress(taskId, updatedTaskProgress);
      console.log(response.data);
      e.target.classList.add('cell-success');
      setTimeout(() => {
        e.target.classList.remove('cell-success');
      }, 2000);
    } catch (error) {
      console.error('Error updating Task Progress:', error);
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
  
  const handleUpdateKpiTarget = async (e, kpiId) => {
    const updatedKpiTarget = e.target.textContent.trim();
    try {
      const response = await updateKpiTarget(updatedKpiTarget, kpiId);
      console.log(response.data);
      e.target.classList.add('cell-success');
      setTimeout(() => {
        e.target.classList.remove('cell-success');
      }, 2000);
    } catch (error) {
      console.error('Error updating KPI Target:', error);
      e.target.classList.add('cell-error');
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
    }
  };
  
  const handleUpdateKpiCurrent = async (e, kpiId) => {
    const updatedKpiCurrent = e.target.textContent.trim();
    try {
      const response = await updateKpiCurrent(updatedKpiCurrent, kpiId);
      console.log(response.data);
      e.target.classList.add('cell-success');
      setTimeout(() => {
        e.target.classList.remove('cell-success');
      }, 2000);
    } catch (error) {
      console.error('Error updating KPI Current:', error);
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
  const handleUpdateRemarkImportance = async (e, projectId) => {
    const updatedValue = e.target.textContent.trim();
    if (updatedValue === '') {
      e.target.classList.add('cell-error');
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
      return;
    }
    try {
      const response = await updateRemarkOrRiskImportance(updatedValue, projectId,);
      console.log(response.data);
      e.target.classList.add('cell-success');
      setTimeout(() => {
        e.target.classList.remove('cell-success');
      }, 2000);
    } catch (error) {
      console.error(`Error updating remark or risk importance:`, error);
      e.target.classList.add('cell-error');
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
    }
  };
//   useEffect(() => {
//     getProject();
//   }, [project]);
//   useEffect(() => {
//    getEtapes();
//   }, [etapes]);
//   useEffect(() => {
//     if (etapes.length > 0) {
//         getTasks();
//     }
// }, [etapes]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Présentation Projet</h2>
              <p className="card-text">
                <strong>Nom : </strong>
                <span
                contentEditable="true"
                onBlur={(e) => handleUpdateName(e, id)}
                suppressContentEditableWarning={true}
                >{project.name}</span>
              </p>
              <p className="card-text">
                <strong>Owner : </strong>
                <span
                contentEditable="true"
                onBlur={(e) => handleUpdateOwner(e, id)}
                suppressContentEditableWarning={true}
                >{project.owner}</span>
              </p>
              <p className="card-text">
                <strong>Date démarrage : </strong>
                <Input type="date" value={project.startDate} 
                 style={{width: '140px'}}
                 onChange={(e) => handleUpdateStartDate(e, id)}
                />
              </p>
              <p className="card-text">
                <strong>Date fin prévue : </strong>
                <Input type="date" value={project.expectedEndDate} 
                 style={{width: '140px'}}
                 onChange={(e) => handleUpdateEndDate(e, id)}
                />
              </p>
              <p className="card-text">
                <strong>Description : </strong>
                <span
                contentEditable="true"
                onBlur={(e) => handleUpdateDescription(e, id)}
                suppressContentEditableWarning={true}
                >{project.description}</span>
              </p>
              {status == "EnLancement" && 
                <p className="card-text">
                <strong>Date MEP : </strong>
                <Input type="date" value={project.actualMepDate} 
                 style={{width: '140px'}}
                 onChange={(e) => handleUpdateMepDate(e, id)}
                />
                </p>
              }
              {status == "EnLancement" && 
                <p className="card-text">
                <strong>Date dernière phase : </strong>
                <Input type="date" value={project.lastPhaseDate} 
                 style={{width: '140px'}}
                 onChange={(e) => handleUpdatePhaseDate(e, id)}
                />
               </p>
              }
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="card">
            <div className="card-body">
              <div className="card-title">
                <div className="row">
                  <div className="col-9">
                    <h5>Fait marquants</h5>
                  </div>
                  <div className="col-3">
                    {isAdminUser() &&  <AddMilestone refreshProject={getProject} projectId={id} />}
                   
                  </div>
                </div>
              </div>

              <ul>
                {(project.milestones || []).map((milestone, index) => (
                  <li className="card-text" key={index}
                  contentEditable="true"
                onBlur={(e) => handleUpdateMilestone(e, index, id)}
                suppressContentEditableWarning={true}
                  >
                    {milestone}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card">
            <div className="card-body">
            <div className="card-title">
                <div className="row">
                  <div className="col-9">
                  <h5>Prochains réalisation</h5>
                  </div>
                  <div className="col-3">
                  {isAdminUser() &&  <AddRealization refreshProject={getProject} projectId={id}/>}
                  </div>
                </div>
              </div>
              
              <ul>
                {(project.upcomingRealizations || []).map(
                  (realization, index) => (
                    <li className="card-text" key={index}
                    contentEditable="true"
                    onBlur={(e) => handleUpdateRealization(e, index, id)}
                    suppressContentEditableWarning={true}
                    >
                      {realization}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <div className="row">
                  <div className="col-9">
                  <h5>Principales Etapes</h5>
                  </div>
                  <div className="col-3">
                    {isAdminUser() &&  <AddEtape refreshEtape={getEtapes} domain={domainId}  /> }
                  </div>
                </div>

          {etapes &&
            etapes.map((etape) => (
              <div key={etape.id}>
                <div className="row"> 
                <div className="col-9">
                  <h6
                  contentEditable="true"
                  onBlur={(e) => handleUpdateEtape(etape.id, e)}
                  suppressContentEditableWarning={true}
                  >{etape.name}</h6>
                  </div>
                  <div className="col-3">
                    {isAdminUser() &&  <AddTask refreshEtape={getEtapes} etapeId={etape.id} projectId={id}  /> }
                  </div>
                </div>
               
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Tache</th>
                      <th>Avancement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks[etape.id] &&
                      tasks[etape.id].map((task) => (
                        <tr key={task.id}>
                          <td
                           contentEditable="true"
                           onBlur={(e) => handleUpdateTaskName(task.id, e)}
                           suppressContentEditableWarning={true}
                          >{task.name}</td>
                          <td
                           contentEditable="true"
                           onBlur={(e) => handleUpdateTaskProgress(task.id, e)}
                           suppressContentEditableWarning={true}
                          >{task.progress}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ))}
        </div>
        <div className="col-4">
          <div className="row">
            <div className="col-9">
              <h5>KPIs de pilotage</h5>
            </div>
            <div className="col-3" style={{ alignContent: "center" }}>
            {isAdminUser() &&  <AddKpiPilotage refreshProject={getProject} projectId={id} /> }
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>KPIs</th>
                    <th>Cible</th>
                    <th>Actuel</th>
                  </tr>
                </thead>
                <tbody>
                  {project.pilotageKpis &&
                    project.pilotageKpis.map((kpi) => (
                      <tr key={kpi.id}>
                        <td
                         contentEditable="true"
                         onBlur={(e) => handleUpdateKpiName(e, kpi.id)}
                         suppressContentEditableWarning={true}
                        >{kpi.name}</td>
                        <td
                        contentEditable="true"
                        onBlur={(e) => handleUpdateKpiTarget(e, kpi.id)}
                        suppressContentEditableWarning={true}
                        >{kpi.target}</td>
                        <td
                        contentEditable="true"
                        onBlur={(e) => handleUpdateKpiCurrent(e, kpi.id)}
                        suppressContentEditableWarning={true}
                        >{kpi.current}</td>
                      </tr>
                    ))}
                </tbody>
              </table>

              <h5>Suivi de budget</h5>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Nombre de sprint alloués</th>
                    <th>Nombre de sprint consommés</th>
                    <th>% d'avancement réél</th>
                  </tr>
                </thead>
                <tbody>
                  <td
                  contentEditable="true"
                  onBlur={(e) => handleUpdateAllocatedSprintCount(e, id)}
                  suppressContentEditableWarning={true}
                  >{project.allocatedSprintCount}</td>
                  <td
                  contentEditable="true"
                  onBlur={(e) => handleUpdateConsumedSprintCount(e, id)}
                  suppressContentEditableWarning={true}
                  >
                    {project.consumedSprintCount
                      ? project.consumedSprintCount
                      : 0}
                  </td>
                  <td
                  contentEditable="true"
                  onBlur={(e) => handleUpdateCompletionPercentage(e, id)}
                  suppressContentEditableWarning={true}
                  >
                    {project.completionPercentage
                      ? project.completionPercentage
                      : "0%"}
                  </td>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="row">
            <div className="col-9">
              <h5>Risques et remarques</h5>
            </div>
            <div className="col-3" style={{ alignContent: "center" }}>
            {isAdminUser() &&  <AddRemarkOrRisk refreshProject={getProject} projectId={id} /> }
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Risque ou remarque</th>
                    <th>Importance</th>
                  </tr>
                </thead>
                <tbody>
                  {project.remarks &&
                    project.remarks.map((remark) => (
                      <tr key={remark.id}>
                        <td
                        contentEditable="true"
                        onBlur={(e) => handleUpdateRemarkName(e, remark.id)}
                        suppressContentEditableWarning={true}
                        >{remark.name}</td>
                        <td
                         contentEditable="true"
                         onBlur={(e) => handleUpdateRemarkImportance(e, remark.id)}
                         suppressContentEditableWarning={true}
                        >{remark.importance}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectComponent;
