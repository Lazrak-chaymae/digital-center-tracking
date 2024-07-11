import React from 'react'

const ReleaseComponent = () => {
  return (
    <div className='container'>
    <h2 className='text-center'>Livraisons</h2>
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
            
        </tbody>
    </table>
</div>
  )
}

export default ReleaseComponent