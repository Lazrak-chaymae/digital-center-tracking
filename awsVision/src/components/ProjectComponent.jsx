import React, { useEffect, useState } from 'react';
import { listProject } from '../services/Project';

const ProjectComponent = () => {
    const [project, setProject] = useState([]);
    const idProject = 4;

    const getProject = () => {
        listProject(idProject).then(
            (response) => {
                setProject(response.data);
            }
        )
            .catch(
                error => {
                    console.error(error);
                }
            )
    }
    useEffect(() => {
        getProject();
        console.log(project);
    }, [])
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Présentation Projet</h2>
                            <p className="card-text"><strong>Nom:</strong>{project.name}</p>
                            <p className="card-text"><strong>Owner:</strong>{project.owner}</p>
                            <p className="card-text"><strong>Date démarrage:</strong>{project.startDate}</p>
                            <p className="card-text"><strong>Date fin prévue:</strong>{project.expectedEndDate}</p>
                            <p className="card-text"><strong>Description:</strong>{project.description}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-6'>
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Fait marquants</h4>
                            <ul>
                                <li className="card-text">Démarrage des tests de Sécurité</li>
                                <li className="card-text">Initiation Architecture Production</li>
                                <li className="card-text">Finalisation des dév API et iOS</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='col-6'>
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Prochains réalisation</h4>
                            <ul>
                                <li className="card-text">Initiation des tests de performances</li>
                                <li className="card-text">Affectation de ressource Intégration</li>
                                <li className="card-text">Finalisation Architecture Production</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-4'>
                    <h4>Principales Etapes</h4>
                    <h5>Phases</h5>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Tache</th>
                                <th>Avancement</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
                <div className='col-4'>
                    <h4>KPIs de pilotage</h4>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>KPIs</th>
                                <th>Cible</th>
                                <th>Actuel</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                    <h4>Suivi de budget</h4>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Nombre de sprint alloués</th>
                                <th>Nombre de sprint consommés</th>
                                <th>% d'avancement réél</th>
                            </tr>
                        </thead>
                        <tbody>
                               <td>{project.allocatedSprintCount}</td>
                               <td>{project.consumedSprintCount}</td>
                               <td>{project.completionPercentage}</td>
                        </tbody>
                    </table>
                </div>
                <div className='col-4'>
                    <h4>Risques et remarques</h4>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Risque ou remarque</th>
                                <th>Importance</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ProjectComponent;
