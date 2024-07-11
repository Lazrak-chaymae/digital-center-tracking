import React from 'react'

const ProjectComponent = () => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12'>

                    <div class="card">
                        <div class="card-body">
                            <h2 class="card-title">Présentation Projet</h2>
                            <p class="card-text"><strong>Nom:</strong></p>
                            <p class="card-text"><strong>Owner:</strong> Charaf JRA</p>
                            <p class="card-text"><strong>Date démarrage:</strong> XX/XX/XXXX</p>
                            <p class="card-text"><strong>Date fin prévue:</strong> XX/XX/XXXX</p>
                            <p class="card-text"><strong>Description:</strong> Mise en place de solution d'authentification forte basée sur le facteur "Device enrollé", et implémentation sur la Canal Selfcare Retail (et CIB)</p>

                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-6'>
                    <div class="card">
                        <div class="card-body">
                            <h2 class="card-title">Fait marquants</h2>
                            <ul>
                                <li class="card-text">Démarrage des tests de Sécurité</li>
                                <li class="card-text">Initiation Architecture Production</li>
                                <li class="card-text">Finalisation des dév API et iOS</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='col-6'>
                    <div class="card">
                        <div class="card-body">
                            <h2 class="card-title">Prochains réalisation</h2>
                            <ul>
                                <li class="card-text">Initiation des tests de performances</li>
                                <li class="card-text">Affectation de ressource Intégration</li>
                                <li class="card-text">Finalisation Architecture Production</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-4'>
                    <h3>Principales Etapes</h3>
                    <h3>Phases</h3>
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
                    <h3>KPIs de pilotage</h3>
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
                    <h3>Suivi de budget</h3>
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
                    <h3>Risques et remarques</h3>
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
    )
}

export default ProjectComponent