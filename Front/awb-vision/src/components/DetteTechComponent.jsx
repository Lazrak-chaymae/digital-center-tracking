import React from 'react'

const DetteTechComponent = () => {
  return (
    <div className='container'>
    <table className='table table-striped table-bordered'>
        <thead>
            <tr>
                <th>Titre</th>
                <th>Type (Compléxité, Duplication, Violation, Instabilité PROD)</th>
                <th>Impact sur le logiciel (S/M/L)</th>
                <th>Coût de correction (S/M/L)</th>
                <th>Volentaire / Involentaire</th>
                <th>Commentaire</th>    
            </tr>
        </thead>
        <tbody>
            
        </tbody>
    </table>
</div>
  )
}

export default DetteTechComponent