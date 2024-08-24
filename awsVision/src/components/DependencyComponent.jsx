import React, { useState, useEffect } from 'react'
import { deleteDependency, listDependencies, updateScheduledDate } from '../services/Dependency';
import AddDependency from './AddDependency';
import { isAdminUser } from '../services/AuthService';
import { DeleteOutlined } from "@ant-design/icons"; 
import { updateTitle, updatePriority } from '../services/Dependency';
import Input from 'antd/es/input/Input';
import DropDownAllSquad from './DropDownAllSquad';
import DropDownAllSquad2 from './DropDownAllSquad2';

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

  const handleUpdate = async(handleFc, dependencyId, value) => {
        
    try {
      const response = await handleFc(dependencyId, value);
      console.log(response.data);
    } catch (error) {
      console.error('Error updating dependency informations :', error);
    }
  }
  useEffect(() => {
     getDependencies();
  }, [dependencies]);

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
                     <td
                     contentEditable= {isAdminUser ? 'true' : 'false'}
                     onBlur={(e) => handleUpdate(updateTitle, dependency.id, e.target.textContent.trim())}
                     suppressContentEditableWarning={true}
                     >{dependency.title}</td>
                     <td
                     contentEditable= {isAdminUser ? 'true' : 'false'}
                     onBlur={(e) => handleUpdate(updatePriority, dependency.id, e.target.textContent.trim())}
                     suppressContentEditableWarning={true}
                     >{dependency.priority}</td>
                     <td>
                     {isAdminUser ? 
                      <DropDownAllSquad2 dependencyId={dependency.id} refresh={getDependencies} upTeam={dependency.responsibleTeam}/>
                
                     : dependency.responsibleTeam }
                    
                      </td>
                     <td>
                     {isAdminUser ? 
                      <DropDownAllSquad dependencyId={dependency.id} refresh={getDependencies} upTeam={dependency.beneficiaryTeam}/>
                     : dependency.beneficiaryTeam }
                      </td>
                     <td>
                     {isAdminUser ? 
                     <Input type="date" value= {dependency.scheduledDate} 
                     style={{width: '140px'}}
                     onChange={(e) => handleUpdate(updateScheduledDate, dependency.id, e.target.value)}
                    /> : dependency.scheduledDate }
                     </td>
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