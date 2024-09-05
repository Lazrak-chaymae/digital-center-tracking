import React, { useState, useEffect } from 'react'
import { deleteRelease, listReleases } from '../services/Release';
import AddRelease from './AddRelease';
import { isAdminUser } from '../services/AuthService';
import { DeleteOutlined } from "@ant-design/icons";
import { Input } from 'antd';
import { updateVersion, updateType, updateInstallationDate, updateEvolution, updateHotfixContents, updatePackages } from '../services/Release';
import TinyCompo from './TinyCompo';

const ReleaseComponent = () => {
  const [releases, setReleases] = useState([]);
  const domainId = sessionStorage.getItem("domainId");
  
  const getReleases = () => {
      listReleases(domainId).then((response) => {
           setReleases(response.data);
      })
      .catch(
         error => {
          console.error(error);
        }
      )
  }
  const handleReleaseDelete = (releaseId) => {
      deleteRelease(releaseId).then((response) => {
         console.log(response.data);
         getReleases();
      }).catch((error) => {
          console.error(error);
      })
  }
  const handleUpdate = async( { handleFc, releaseId, value}) => {
        
    try {
    
      const response = await handleFc(releaseId, value);
      console.log(response.data);

      
    } catch (error) {
      console.error('Error updating support informations :', error);
    }
  }
  useEffect(() => {
     getReleases();
  }, [releases])

  return (
    <div className='container'  style={{ paddingTop: '12px'}}>
    <h3 className='text-center'>Livraisons</h3>
    <table className='table table-striped table-bordered'>
        <thead>
            <tr>
                <th>Date d'installation</th>
                <th>Version</th>
                <th>Type (Hotfix / Evolution)</th>
                <th>Packages</th>
                <th>Contenu Hotfix</th>
                <th>Contenu Evolution</th>  
                {isAdminUser() &&
                <th>Actions</th>
                }
            </tr>
        </thead>
        <tbody>
             {  releases.map( (release) => (
                 <tr key={release.id}>
                    <td>
                    {isAdminUser ? 
                    <Input type="date" value= {release.installationDate} 
                     style={{width: '140px'}}
                     onChange={(e) => handleUpdate({ handleFc: updateInstallationDate,releaseId: release.id, value: e.target.value})}
                    />
                    :  release.installationDate }
                     </td>
                    <td
                    contentEditable={isAdminUser ? 'true' : 'false'}
                    onBlur={(e) => handleUpdate({ handleFc: updateVersion,releaseId: release.id, value: e.target.textContent.trim()})}
                    suppressContentEditableWarning={true}
                    >{release.version}</td>
                    <td
                    contentEditable={isAdminUser ? 'true' : 'false'}
                    onBlur={(e) => handleUpdate({ handleFc: updateType,releaseId: release.id, value: e.target.textContent.trim()})}
                    suppressContentEditableWarning={true}
                    >{release.type}</td>
                    
                   <td>
                   <TinyCompo id={release.id} value={release.packages} fonction={updatePackages} admin={isAdminUser}/>
                   </td>
                   
                    <td>
                   <TinyCompo id={release.id} value={release.hotfixContents} fonction={updateHotfixContents} admin={isAdminUser} />
                   </td>
                    <td
                    contentEditable={isAdminUser ? 'true' : 'false'}
                    onBlur={(e) => handleUpdate({ handleFc: updateEvolution,releaseId: release.id, value: e.target.textContent.trim()})}
                    suppressContentEditableWarning={true}
                    >{release.evolution}</td>
                    {isAdminUser() &&
                    <td><DeleteOutlined onClick={() => handleReleaseDelete(release.id)}
                    style={{color: "red"}}
                    /></td>
}
                 </tr>
             ))}
        </tbody>
    </table>
    {isAdminUser() &&  <AddRelease refreshReleases={getReleases} domainId={domainId} /> }
</div>
  )
}

export default ReleaseComponent