import React, { useEffect, useState } from "react";
import { DetailProject } from "../services/Project";
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

const ProjectComponent = () => {
  const [project, setProject] = useState({});
  const [etapes, setEtapes] = useState([]);
  const [tasks, setTasks] = useState([]);
  const domainId = sessionStorage.getItem("domainId");
  const { id } = useParams();

  const getProject = () => {
    DetailProject(id)
      .then((response) => {
        setProject(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getEtapes = () => {
    listEtapes(domainId)
    .then((response) => {
        setEtapes(response.data);
        console.log(response.data);
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
      console.log("data" + tasks);
  } catch (error) {
      console.error(error);
  }
  }
  useEffect(() => {
    getProject();
  }, [id]);
  useEffect(() => {
   getEtapes();
  }, []);
  useEffect(() => {
    if (etapes.length > 0) {
        getTasks();
    }
}, [etapes]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Présentation Projet</h2>
              <p className="card-text">
                <strong>Nom : </strong>
                {project.name}
              </p>
              <p className="card-text">
                <strong>Owner : </strong>
                {project.owner}
              </p>
              <p className="card-text">
                <strong>Date démarrage : </strong>
                {project.startDate}
              </p>
              <p className="card-text">
                <strong>Date fin prévue : </strong>
                {project.expectedEndDate}
              </p>
              <p className="card-text">
                <strong>Description : </strong>
                {project.description}
              </p>
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
                  <li className="card-text" key={index}>
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
                    <li className="card-text" key={index}>
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
                  <h6>{etape.name}</h6>
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
                          <td>{task.name}</td>
                          <td>{task.progress}</td>
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
                        <td>{kpi.name}</td>
                        <td>{kpi.target}</td>
                        <td>{kpi.current}</td>
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
                  <td>{project.allocatedSprintCount}</td>
                  <td>
                    {project.consumedSprintCount
                      ? project.consumedSprintCount
                      : 0}
                  </td>
                  <td>
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
                        <td>{remark.name}</td>
                        <td>{remark.importance}</td>
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
