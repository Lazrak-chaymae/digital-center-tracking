import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { listProjects, listSquads } from '../services/DashboardEnConst'

const DashboardConstComponent = () => {
    const [ucProject, setUcProject] = useState([]);
    const [squads, setSquads] = useState([]);
    const navigator = useNavigate();
    
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
            setUcProject(data);
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

                                </tr>
                            </thead>
                            <tbody>
                                {ucProject[squad.id] && ucProject[squad.id].map(
                                    project => (
                                        
                                        <tr key={project.id}>
                                            <td><a href={`/project/${project.id}`} style={{ textDecoration: 'none' }}>Projet {project.id}</a></td>
                                            <td>{project.name}</td>
                                            <td>{project.description}</td>
                                            <td>{project.startDate}</td>
                                            <td>{project.budget}</td>
                                            <td>{project.consumedSprintCount}</td>
                                            <td>{project.phase}</td>
                                            <td>{project.milestones.map((milestone, index) => (
                                                <span key={index}>{milestone}
                                                 <br/>
                                                </span>
                                            ))}</td>
                                            <td>{project.upcomingRealizations.map((realization,index) => (
                                                <span key={index}>{realization}
                                                <br />
                                                </span>
                                            ))}</td>
                                            <td>{project.type}</td>
                                            <td>{project.remarks.map((remark) => (
                                                <span key={remark.id}>{remark.name}
                                                <br />
                                                </span>
                                            ))}</td>
                                            <td>{project.progress}</td>
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