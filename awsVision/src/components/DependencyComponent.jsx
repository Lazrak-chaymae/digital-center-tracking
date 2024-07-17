import React, { useState, useEffect } from 'react'
import { listDependencies } from '../services/Dependency';

const DependencyComponent = () => {

  const [dependencies, setDependencies] = useState([]);

  const getDependencies = () => {
       listDependencies().then(
          (response) => {
              setDependencies(response.data);
          }
       ).catch(error => {
           console.error(error);
       });
  }
  useEffect(() => {
     getDependencies();
  }, []);

  return (
    <div className='container' style={{ paddingTop : '12px'}}>
      <h3 className='text-center'>Dépendance entre équipes</h3>
    <table className='table table-striped table-bordered'>
        <thead>
            <tr>
                <th>Titre</th>
                <th>Priorité</th>
                <th>Equipe responsable</th>
                <th>Equipe bénéficiaire</th>
                <th>Date prévue</th>
            </tr>
        </thead>
        <tbody>
            { dependencies.map(
               dependency => (
                  <tr key={dependency.id}>
                     <td>{dependency.title}</td>
                     <td>{dependency.priority}</td>
                     <td>{dependency.responsibleTeam}</td>
                     <td>{dependency.beneficiaryTeam}</td>
                     <td>{dependency.scheduledDate}</td>
                  </tr>
               )
            )

            }
        </tbody>
    </table>
</div>
  )
}

export default DependencyComponent