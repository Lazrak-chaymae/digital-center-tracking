import React, { useEffect, useState } from 'react'
import { listProjects, listSquads } from '../services/DashboardEnLanc';

const DashboardLcmComponent = () => {

  const [lcProject, setLcProject] = useState([]);
  const [squads, setSquads] = useState([]);

  const GetSquads = async () => {
    try {
      const response = await listSquads();
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

  useEffect(() => {
    GetSquads();
  }, []);

  useEffect(() => {
    if (squads.length > 0) {
      GetProjects();
    }
  }, [squads]);
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

                </tr>
              </thead>
              <tbody>
                {lcProject[squad.id] && lcProject[squad.id].map(
                  project => (
                    <tr key={project.id}>
                      <td><a href={`/project/${project.id}`} style={{ textDecoration: 'none' }}>Projet {project.id}</a></td>
                      <td>{project.name}</td>
                      <td>{project.description}</td>
                      <td>{project.actualMepDate}</td>
                      <td>{project.phase}</td>
                      <td>{project.lastPhaseDate}</td>
                      <td>{project.kpis}</td>
                      <td>
                        {project.remarks.map(remark => (
                          <div key={remark.id}>{remark.name}</div>
                        ))}
                      </td>
                      <td>{project.type}</td>
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