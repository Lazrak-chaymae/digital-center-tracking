import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { listProjects, listSquads } from '../services/DashboardEnConst'

const DashboardConstComponent = () => {
    const [ucProject, setUcProject] = useState([]);
    const [squads, setSquads] = useState([
        {
            id: 1,
            name: "Squad Selfcare"
        },
        {
            id: 1,
            name: "Squad Socle"
        },
        {
            id: 1,
            name: "Squad EER"
        },
    ]);
    const navigator = useNavigate();

    useEffect(() => {
        /*
        listSquads().then((response) => {
            setSquads(response.data);
        }).catch(error => {
            console.error(error);
        });
        */
    }, []);

    useEffect(() => {
        const data = {};
        for (const squad of squads) {
            listProjects(squad.id).then((response) => {
                data[squad.id] = response.data;
            })
                .catch(error => {
                    console.error(error);
                })
        }
        setUcProject(data);

    }, [squads])

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
                                    projet => (
                                        <tr key={projet.id}>
                                            <td>Projet {kpi.id}</td>
                                            <td>{projet.name}</td>
                                            <td>{projet.description}</td>
                                            <td>{projet.startDate}</td>
                                            <td>{projet.budget}</td>
                                            <td>{projet.consumed}</td>
                                            <td>{projet.milestones}</td>
                                            <td>{projet.upcomingRealizations}</td>
                                            <td>{projet.type}</td>
                                            <td>{projet.remarks}</td>
                                            <td>{projet.progress}</td>
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