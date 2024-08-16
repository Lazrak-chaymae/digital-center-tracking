import React, { useState, useEffect } from 'react'
import { deleteRelease, listReleases } from '../services/Release';
import AddRelease from './AddRelease';
import { isAdminUser } from '../services/AuthService';
import { DeleteOutlined } from "@ant-design/icons";


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
  useEffect(() => {
     getReleases();
  }, [])

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
                    <td>{release.installationDate}</td>
                    <td>{release.version}</td>
                    <td>{release.type}</td>
                    <td>{ release.packages.map((pkg, index) => (
                  <span key={index}>
                    {pkg}
                    <br />
                  </span>
                ))}</td>
                    <td>{release.hotfixContents.map((content, index) => (
                  <span key={index}>
                    {content}
                    <br />
                  </span>
                ))}</td>
                    <td>{release.evolution}</td>
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