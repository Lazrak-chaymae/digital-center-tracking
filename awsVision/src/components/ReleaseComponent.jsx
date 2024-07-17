import React, { useState, useEffect } from 'react'
import { listReleases } from '../services/Release';

const ReleaseComponent = () => {
  const [releases, setReleases] = useState([]);
  
  const getReleases = () => {
      listReleases().then((response) => {
           setReleases(response.data);
      })
      .catch(
         error => {
          console.error(error);
        }
      )
  }

  useEffect(() => {
     getReleases();
  }, [])

  return (
    <div className='container' style={{ paddingTop : '12px'}}>
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
            </tr>
        </thead>
        <tbody>
             {  releases.map( (release) => (
                 <tr key={release.id}>
                    <td>{release.installationDate}</td>
                    <td>{release.version}</td>
                    <td>{release.Hotfix}</td>
                    <td>{release.packages}</td>
                    <td>{release.hotfixContents}</td>
                    <td>{release.evolution}</td>

                 </tr>
             ))}
        </tbody>
    </table>
</div>
  )
}

export default ReleaseComponent