import React from 'react'

const DashboardLcmComponent = () => {
  return (
    <div className='container' style={{ paddingTop : '12px'}}>
    <h3 className='text-center'>Sujet en Pilote ou Généralisation</h3>
    <table className='table table-striped table-bordered'>
        <thead>
            <tr>
                <th>Code</th>
                <th>Nom</th>
                <th>Description</th>
                <th>Date MEP</th>
                <th>Phase</th>
                <th>Date dernière phase</th>
                <th>KPIs</th>
                <th>Remarques</th>
                <th>Type</th>
                
            </tr>
        </thead>
        <tbody>
            
        </tbody>
    </table>
</div>
  )
}

export default DashboardLcmComponent