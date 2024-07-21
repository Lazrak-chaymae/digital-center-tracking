import React from 'react';

const ProjectComponent = () => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Présentation Projet</h2>
                            <p className="card-text"><strong>Nom:</strong></p>
                            <p className="card-text"><strong>Owner:</strong> Charaf JRA</p>
                            <p className="card-text"><strong>Date démarrage:</strong> XX/XX/XXXX</p>
                            <p className="card-text"><strong>Date fin prévue:</strong> XX/XX/XXXX</p>
                            <p className="card-text"><strong>Description:</strong> Mise en place de solution d'authentification forte basée sur le facteur "Device enrollé", et implémentation sur la Canal Selfcare Retail (et CIB)</p>
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
