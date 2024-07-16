import React from 'react'

const DependancyComponent = () => {
  return (
    <div className='container' style={{ paddingTop : '12px'}}>
      <h3>Dépendance entre équipes</h3>
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
            
        </tbody>
    </table>
</div>
  )
}

export default DependancyComponent