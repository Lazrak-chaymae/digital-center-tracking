import React, { useState, useEffect } from 'react'
import { deleteRelease, listReleases } from '../services/Release';
import AddRelease from './AddRelease';
import { isAdminUser } from '../services/AuthService';
import { DeleteOutlined } from "@ant-design/icons";
import { Input } from 'antd';
import { updateVersion, updateType, updateInstallationDate, updateEvolution, updateHotfixContents, updatePackages } from '../services/Release';


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
  const handleUpdateVersion = async (releaseId, e) => {
  
    const updatedVersion = e.target.textContent.trim();
    if (updatedVersion === '') {
      e.target.classList.add('cell-error');
      getReleases();
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
      return; 
    }
    try {
      const response = await updateVersion(releaseId, updatedVersion);
      console.log(response.data);
  
      e.target.classList.add('cell-success');
      setTimeout(() => {
      e.target.classList.remove('cell-success');
      }, 2000);
    } catch (error) {
      console.error('Error updating Version :', error);
      e.target.classList.add('cell-error');
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
    }
  };
  const handleUpdateType = async (releaseId, e) => {
  
    const updatedType = e.target.textContent.trim();
    if (updatedType === '') {
      e.target.classList.add('cell-error');
      getReleases();
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
      return; 
    }
    try {
      const response = await updateType(releaseId, updatedType);
      console.log(response.data);
  
      e.target.classList.add('cell-success');
      setTimeout(() => {
      e.target.classList.remove('cell-success');
      }, 2000);
    } catch (error) {
      console.error('Error updating Type:', error);
      e.target.classList.add('cell-error');
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
    }
  };
  const handleUpdateEvolution = async (releaseId, e) => {
  
    const updatedEvolution = e.target.textContent.trim();
    if (updatedEvolution === '') {
      e.target.classList.add('cell-error');
      getReleases();
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
      return; 
    }
    try {
      const response = await updateEvolution(releaseId, updatedEvolution);
      console.log(response.data);
  
      e.target.classList.add('cell-success');
      setTimeout(() => {
      e.target.classList.remove('cell-success');
      }, 2000);
    } catch (error) {
      console.error('Error updating Evolution:', error);
      e.target.classList.add('cell-error');
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
    }
  };
  const handleUpdateContent = async (releaseId, index, e) => {
  
    const updatedContent = e.target.textContent.trim();
    if (updatedContent === '') {
      e.target.classList.add('cell-error');
      getReleases();
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
      return; 
    }
    try {
      const response = await updateHotfixContents(releaseId, index, updatedContent);
      console.log(response.data);
  
      e.target.classList.add('cell-success');
      setTimeout(() => {
      e.target.classList.remove('cell-success');
      }, 2000);
    } catch (error) {
      console.error('Error updating Content:', error);
      e.target.classList.add('cell-error');
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
    }
  };
  const handleUpdateInstallationDate = async (releaseId, e) => {
  
    const updatedDate = e.target.value;
    if (updatedDate === '') {
      e.target.classList.add('cell-error');
      getReleases();
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
      return; 
    }
    try {
      const response = await updateInstallationDate(releaseId, updatedDate);
      console.log(response.data);
  
      e.target.classList.add('cell-success');
      setTimeout(() => {
      e.target.classList.remove('cell-success');
      }, 2000);
    } catch (error) {
      console.error('Error updating Installation date:', error);
      e.target.classList.add('cell-error');
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
    }
  };
  const handleUpdatePackage = async (releaseId, index, e) => {
  
    const updatedPackage = e.target.textContent.trim();
    if (updatedPackage === '') {
      e.target.classList.add('cell-error');
      getReleases();
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
      return; 
    }
    try {
      const response = await updatePackages(releaseId, index, updatedPackage);
      console.log(response.data);
  
      e.target.classList.add('cell-success');
      setTimeout(() => {
      e.target.classList.remove('cell-success');
      }, 2000);
    } catch (error) {
      console.error('Error updating Package:', error);
      e.target.classList.add('cell-error');
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
    }
  };
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
                <th></th>
                }
            </tr>
        </thead>
        <tbody>
             {  releases.map( (release) => (
                 <tr key={release.id}>
                    <td>
                    <Input type="date" value= {release.installationDate} 
                     style={{width: '140px'}}
                     onChange={(e) => handleUpdateInstallationDate(release.id, e)}
                    />
                     </td>
                    <td
                    contentEditable="true"
                    onBlur={(e) => handleUpdateVersion(release.id, e)}
                    suppressContentEditableWarning={true}
                    >{release.version}</td>
                    <td
                    contentEditable="true"
                    onBlur={(e) => handleUpdateType(release.id, e)}
                    suppressContentEditableWarning={true}
                    >{release.type}</td>
                    <td>{ release.packages.map((pkg, index) => (
                  <span key={index}
                  contentEditable="true"
                  onBlur={(e) => handleUpdatePackage(release.id, index, e)}
                  suppressContentEditableWarning={true}
                  >
                    {pkg}
                    <br />
                  </span>
                ))}</td>
                    <td>{release.hotfixContents.map((content, index) => (
                  <span key={index}
                  contentEditable="true"
                  onBlur={(e) => handleUpdateContent(release.id, index, e)}
                  suppressContentEditableWarning={true}
                  >
                    {content}
                    <br />
                  </span>
                ))}</td>
                    <td
                    contentEditable="true"
                    onBlur={(e) => handleUpdateEvolution(release.id, e)}
                    suppressContentEditableWarning={true}
                    >{release.evolution}</td>
                    {isAdminUser() &&
                    <td><DeleteOutlined onClick={() => handleReleaseDelete(release.id)}/></td>
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