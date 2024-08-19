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
  const handleUpdateTitle = async (e, dependencyId) => {
  
    const updatedTitle = e.target.textContent.trim();
    if ( updatedTitle === '') {
      e.target.classList.add('cell-error');
      getDependencies();
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
      return; 
    }
    try {
      const response = await updateTitle(dependencyId, updatedTitle);
      console.log(response.data);
  
      e.target.classList.add('cell-success');
      setTimeout(() => {
      e.target.classList.remove('cell-success');
      }, 2000);
    } catch (error) {
      console.error('Error updating Title:', error);
      e.target.classList.add('cell-error');
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
    }
  };
 
  const  handleUpdatePriority = async (e, dependencyId) => {
  
    const updatedPriority = e.target.textContent.trim();
    if ( updatedPriority === '') {
      e.target.classList.add('cell-error');
      getDependencies();
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
      return; 
    }
    try {
      const response = await updatePriority(dependencyId, updatedPriority);
      console.log(response.data);
  
      e.target.classList.add('cell-success');
      setTimeout(() => {
      e.target.classList.remove('cell-success');
      }, 2000);
    } catch (error) {
      console.error('Error updating Priority:', error);
      e.target.classList.add('cell-error');
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
    }
  };

  const  handleUpdateScheduledDate = async (e, dependencyId) => {
  
    const updatedDate = e.target.value;
    if (updatedDate === '') {
      e.target.classList.add('cell-error');
      getDependencies();
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
      return; 
    }
    try {
      const response = await updateScheduledDate(dependencyId, updatedDate);
      console.log(response.data);
  
      e.target.classList.add('cell-success');
      setTimeout(() => {
      e.target.classList.remove('cell-success');
      }, 2000);
    } catch (error) {
      console.error('Error updating Date:', error);
      e.target.classList.add('cell-error');
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
    }
  };
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
                     contentEditable= 'true'
                     onBlur={(e) => handleUpdateTitle(e, dependency.id)}
                     suppressContentEditableWarning={true}
                     >{dependency.title}</td>
                     <td
                     contentEditable= 'true'
                     onBlur={(e) => handleUpdatePriority(e, dependency.id)}
                     suppressContentEditableWarning={true}
                     >{dependency.priority}</td>
                     <td>
                     <DropDownAllSquad2 dependencyId={dependency.id} refresh={getDependencies} upTeam={dependency.responsibleTeam}/>
                      {/* {dependency.responsibleTeam} */}
                      </td>
                     <td>
                      <DropDownAllSquad dependencyId={dependency.id} refresh={getDependencies} upTeam={dependency.beneficiaryTeam}/>
                      {/* {dependency.beneficiaryTeam} */}
                      </td>
                     <td>
                     <Input type="date" value= {dependency.scheduledDate} 
                     style={{width: '140px'}}
                     onChange={(e) => handleUpdateScheduledDate(e, dependency.id)}
                    />
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