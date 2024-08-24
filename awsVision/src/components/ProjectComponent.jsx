import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { DetailProject, updateStartDate, updateUpcomingRealization } from "../services/Project";
import { useParams } from "react-router-dom";
import AddKpiPilotage from "./AddKpiPilotage";
import AddRemarkOrRisk from "./AddRemarkOrRisk";
import AddMilestone from "./AddMilestone";
import AddRealization from "./AddRealization";
import { isAdminUser } from "../services/AuthService";
import { listEtapes } from "../services/Etape";
import { deleteTask, listTasks } from "../services/Task";
import AddEtape from "./AddEtape";
import AddTask from "./AddTask";
import {
  updateName,
  updateDescription,
  updateActualMepDate,
  updateAllocatedSprintCount,
  updateCompletionPercentage,
  updateConsumedSprintCount,
  updateExpectedDate,
  updateKpiCurrent,
  updateKpiName,
  updateKpiTarget,
  updateLastPhaseDate,
  updateMilestone,
  updateOwner,
  updateRemarkOrRiskImportance,
  updateRemarkOrRiskName,
} from "../services/Project";

import { updateTaskName, updateTaskProgress } from "../services/Task";
import { updateEtape, deleteEtape } from "../services/Etape";
import { DeleteOutlined } from "@ant-design/icons";
import { listTodosByProject, deleteTodo, updateTodoName, updateTodoDeadline, updateTodoDetail, updateTodoStatus, updateTodoResponsible} from "../services/Todo";
import AddTodo from "./AddTodo";
import DropDownUser from "./DropDownUser";

const ProjectComponent = () => {
  const [project, setProject] = useState({});
  const [etapes, setEtapes] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("");
  const domainId = sessionStorage.getItem("domainId");
  const { id } = useParams();
  const [todos, setTodos] = useState([]);

    const getTodosByProject = async() => {
        try { 
        const response = await listTodosByProject(id);
        setTodos(response.data);
        }
        catch(error){
            console.error(error);
        }
    }
    const handleTodoDelete = (todoId) => {
      deleteTodo(todoId).then((response) => {
         console.log(response.data);
         getTodosByProject();
      }).catch((error) => {
          console.error(error);
      })
  }

    useEffect(() => {
        getTodosByProject();
    } ,[todos])
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
      });
  };
  const getTasks = async () => {
    try {
      const data = {};
      for (const etape of etapes) {
        const response = await listTasks(id, etape.id);
        data[etape.id] = response.data;
      }
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleEtapeDelete = async (etapeId) => {
    try {
      const response = await deleteEtape(etapeId);
      console.log(response.data);
      getEtapes();
    } catch (error) {
      console.error(error);
    }
  };
  const handleTaskDelete = async (taskId) => {
    try {
      const response = await deleteTask(taskId);
      console.log(response.data);
      getTasks();
    } catch (error) {
      console.error(error);
    }
  };
 ;

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
                  onBlur={(e) => handleUpdate({ handleFc: updateName, id: id, value: e.target.textContent.trim()})}
                  suppressContentEditableWarning={true}
                >
                  {project.name}
                </span>
              </p>
              <p className="card-text">
                <strong>Owner : </strong>
                <span
                  contentEditable="true"
                  onBlur={(e) => handleUpdate({ handleFc: updateOwner, id: id, value: e.target.textContent.trim()})}
                  suppressContentEditableWarning={true}
                >
                  {project.owner}
                </span>
              </p>
              <p className="card-text">
                <strong>Date démarrage : </strong>
                <Input
                  type="date"
                  value={project.startDate}
                  style={{ width: "140px" }}
                  onChange={(e) => handleUpdate({ handleFc: updateStartDate, id: id, value: e.target.value})}
                />
              </p>
              <p className="card-text">
                <strong>Date fin prévue : </strong>
                <Input
                  type="date"
                  value={project.expectedEndDate}
                  style={{ width: "140px" }}
                  onChange={(e) => handleUpdate({ handleFc: updateExpectedDate, id: id, value: e.target.value})}
                />
              </p>
              <p className="card-text">
                <strong>Description : </strong>
                <span
                  contentEditable="true"
                  onBlur={(e) => handleUpdate({ handleFc: updateDescription, id: id, value: e.target.textContent.trim()})}
                  suppressContentEditableWarning={true}
                >
                  {project.description}
                </span>
              </p>
              {status == "EnLancement" && (
                <p className="card-text">
                  <strong>Date MEP : </strong>
                  <Input
                    type="date"
                    value={project.actualMepDate}
                    style={{ width: "140px" }}
                    onChange={(e) => handleUpdate({ handleFc: updateActualMepDate, id: id, value: e.target.value})}
                  />
                </p>
              )}
              {status == "EnLancement" && (
                <p className="card-text">
                  <strong>Date dernière phase : </strong>
                  <Input
                    type="date"
                    value={project.lastPhaseDate}
                    style={{ width: "140px" }}
                    onChange={(e) => handleUpdate({ handleFc: updateLastPhaseDate, id: id, value: e.target.value})}
                  />
                </p>
              )}
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
                    {isAdminUser() && (
                      <AddMilestone
                        refreshProject={getProject}
                        projectId={id}
                      />
                    )}
                  </div>
                </div>
              </div>

              <ul>
                {(project.milestones || []).map((milestone, index) => (
                  <li
                    className="card-text"
                    key={index}
                    contentEditable="true"
                    onBlur={(e) => handleUpdate({ handleFc: updateMilestone, id: id, value: e.target.textContent.trim(), index: index})}
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
                    {isAdminUser() && (
                      <AddRealization
                        refreshProject={getProject}
                        projectId={id}
                      />
                    )}
                  </div>
                </div>
              </div>

              <ul>
                {(project.upcomingRealizations || []).map(
                  (realization, index) => (
                    <li
                      className="card-text"
                      key={index}
                      contentEditable="true"
                      onBlur={(e) => handleUpdate({ handleFc: updateUpcomingRealization, id: id, value: e.target.textContent.trim(), index: index})}
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
              {isAdminUser() && (
                <AddEtape refreshEtape={getEtapes} domain={domainId} />
              )}
            </div>
          </div>

          {etapes &&
            etapes.map((etape) => (
              <div key={etape.id}>
                <div className="row">
                  <div className="col-9">
                    <h6
                      contentEditable="true"
                      onBlur={(e) => handleUpdate({ handleFc: updateEtape, id: etape.id, value: e.target.textContent.trim()})}
                      suppressContentEditableWarning={true}
                    >
                      {etape.name}
                    </h6>
                  </div>
                  <div className="col-3">
                    {isAdminUser() && (
                      <div>
                        {" "}
                        <AddTask
                          refreshEtape={getTasks}
                          etapeId={etape.id}
                          projectId={id}
                        />
                        <DeleteOutlined
                          onClick={() => handleEtapeDelete(etape.id)}
                        />{" "}
                      </div>
                    )}
                  </div>
                </div>

                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Tache</th>
                      <th>Avancement</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks[etape.id] &&
                      tasks[etape.id].map((task) => (
                        <tr key={task.id}>
                          <td
                            contentEditable="true"
                            onBlur={(e) => handleUpdate({ handleFc: updateTaskName, id: task.id, value: e.target.textContent.trim()})}
                            suppressContentEditableWarning={true}
                          >
                            {task.name}
                          </td>
                          <td
                            contentEditable="true"
                            onBlur={(e) => handleUpdate({ handleFc: updateTaskProgress, id: task.id, value: e.target.textContent.trim()})}
                            suppressContentEditableWarning={true}
                          >
                            {task.progress}
                          </td>
                          <td>
                            <DeleteOutlined
                              onClick={() => handleTaskDelete(task.id)}
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ))}
        </div>
        <div className="col-8">
          <div className="row">
            <div className="col-6">
             
                <div className="row">
                  <div className="col-9">
                    <h5>KPIs de pilotage</h5>
                  </div>
                  <div className="col-3" style={{ alignContent: "center" }}>
                    {isAdminUser() && (
                      <AddKpiPilotage
                        refreshProject={getProject}
                        projectId={id}
                      />
                    )}
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
                                onBlur={(e) => handleUpdate({ handleFc: updateKpiName, id: kpi.id, value: e.target.textContent.trim()})}
                                suppressContentEditableWarning={true}
                              >
                                {kpi.name}
                              </td>
                              <td
                                contentEditable="true"
                                onBlur={(e) => handleUpdate({ handleFc: updateKpiTarget, id: kpi.id, value: e.target.textContent.trim()})}
                                suppressContentEditableWarning={true}
                              >
                                {kpi.target}
                              </td>
                              <td
                                contentEditable="true"
                                onBlur={(e) =>
                                  handleUpdate({ handleFc: updateKpiCurrent, id: kpi.id, value: e.target.textContent.trim()})
                                }
                                suppressContentEditableWarning={true}
                              >
                                {kpi.current}
                              </td>
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
                          onBlur={(e) =>
                            handleUpdate({ handleFc: updateAllocatedSprintCount, id: id, value: e.target.textContent.trim()})
                          }
                          suppressContentEditableWarning={true}
                        >
                          {project.allocatedSprintCount}
                        </td>
                        <td
                          contentEditable="true"
                          onBlur={(e) => handleUpdate({ handleFc: updateConsumedSprintCount, id: id, value: e.target.textContent.trim()})}
                          suppressContentEditableWarning={true}
                        >
                          {project.consumedSprintCount
                            ? project.consumedSprintCount
                            : 0}
                        </td>
                        <td
                          contentEditable="true"
                          onBlur={(e) =>
                            handleUpdate({ handleFc: updateCompletionPercentage, id: id, value: e.target.textContent.trim()})
                          }
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
            <div className="col-6">
              
                <div className="row">
                  <div className="col-9">
                    <h5>Risques et remarques</h5>
                  </div>
                  <div className="col-3" style={{ alignContent: "center" }}>
                    {isAdminUser() && (
                      <AddRemarkOrRisk
                        refreshProject={getProject}
                        projectId={id}
                      />
                    )}
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
                                onBlur={(e) =>
                                  handleUpdate({ handleFc: updateRemarkOrRiskName, id: remark.id, value: e.target.textContent.trim()})
                                }
                                suppressContentEditableWarning={true}
                              >
                                {remark.name}
                              </td>
                              <td
                                contentEditable="true"
                                onBlur={(e) =>
                                  handleUpdate({ handleFc: updateRemarkOrRiskImportance, id: remark.id, value: e.target.textContent.trim()})
                                }
                                suppressContentEditableWarning={true}
                              >
                                {remark.importance}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
            
            </div>
          </div>
          
        </div>
      </div>
      <div className="row">
      <div className="row">
            <div className="col-12">
              <h5>Taches</h5>
              <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Nom tache</th>
          <th>Détail</th>
          <th>Deadline</th>
          <th>Statut</th>
          <th>Porteur</th>
          <th>Responsable</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
         {todos && todos.map((todo) => (
            <tr key={todo.id}>
            <td
            contentEditable='true' 
            onBlur={(e) => handleUpdate({ handleFc: updateTodoName, id: todo.id, value: e.target.textContent.trim()})}
            suppressContentEditableWarning={true}
            >{todo.name}</td>
            <td
            contentEditable='true' 
            onBlur={(e) => handleUpdate({ handleFc: updateTodoDetail, id: todo.id, value: e.target.textContent.trim()})}
            suppressContentEditableWarning={true}
            >{todo.detail}</td>
            <td> <Input type="date" value= {todo.deadline} 
                     style={{width: '115px'}}
                     onChange={(e) => handleUpdate({ handleFc: updateTodoDeadline, id: todo.id, value: e.target.value})}
            /></td>
            <td
            contentEditable='true' 
            onBlur={(e) => handleUpdate({ handleFc: updateTodoStatus, id: todo.id, value: e.target.textContent.trim()})}
            suppressContentEditableWarning={true}
            >{todo.status}</td>
             <td>
                <DropDownUser  refresh={getTodosByProject} todoId={todo.id} todoUser={todo.userName}/>
            </td>
            <td
            contentEditable='true' 
            onBlur={(e) => handleUpdate({ handleFc: updateTodoResponsible, id: todo.id, value: e.target.textContent.trim()})}
            suppressContentEditableWarning={true}
            >
                {todo.responsible}
            </td>
           
            <td><DeleteOutlined onClick={() => handleTodoDelete(todo.id)}/></td>
            </tr>
         ))}
      </tbody>
    </table>
      <AddTodo  refreshTodo={getTodosByProject} domain={domainId} defaultProject={id}/>
            </div>
          </div>
      </div>
    </div>
  );
};

export default ProjectComponent;
