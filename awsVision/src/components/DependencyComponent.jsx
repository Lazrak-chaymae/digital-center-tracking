import React, { useState, useEffect } from 'react'
import { deleteDependency, listDependencies } from '../services/Dependency';
import AddDependency from './AddDependency';
import { isAdminUser } from '../services/AuthService';
import { DeleteOutlined } from "@ant-design/icons"; 

const DependencyComponent = () => {

  const [dependencies, setDependencies] = useState([]);
  const domainId = sessionStorage.getItem("domainId");

  const getDependencies = () => {
       listDependencies(domainId).then(
          (response) => {
              setDependencies(response.data);
          }
       ).catch(error => {
           console.error(error);
       });
  }
  const handleDependencyDelete = (dependencyId) => {
     deleteDependency(dependencyId).then((response) => {
         console.log(response.data);
         getDependencies();
     }).catch((error) => {
         console.error(error);
     })
  }
  useEffect(() => {
     getDependencies();
  }, []);

  return (
    <div className='container'  style={{ paddingTop: '12px'}}>
      <h3 className='text-center'>Dépendance entre équipes</h3>
    <table className='table table-striped table-bordered'>
        <thead>
            <tr>
                <th>Titre</th>
                <th>Priorité</th>
                <th>Equipe responsable</th>
                <th>Equipe bénéficiaire</th>
                <th>Date prévue</th>
                {isAdminUser() &&
                <th></th>
                }
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
                     {isAdminUser() &&
                     <td><DeleteOutlined onClick={() => handleDependencyDelete(dependency.id)} /></td>
}
                  </tr>
               )
            )

            }
        </tbody>
    </table>
    {isAdminUser() && 
    <AddDependency refreshDependencies={getDependencies} domainId={domainId} />
    }
</div>
  )
}

export default DependencyComponent