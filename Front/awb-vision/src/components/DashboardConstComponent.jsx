import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DashboardConstComponent = () => {
    const [UCProject, setUCProject] = useState([])
    const navigator = useNavigate();    
    
    function getAllUCProject(){
        
    }
    return (
    <div className='container'>
    <h2 className='text-center'>Sujet en cadrage ou développement</h2>
    <h2>Squad</h2>
    <table className='table table-striped table-bordered'>
        <thead>
            <tr>
                <th>Code</th>
                <th>Nom</th>
                <th>Description</th>
                <th>Date début</th>
                <th>Budget</th>
                <th>Consommé en Sprint</th>
                <th>Phase</th>
                <th>Fait marquants</th>
                <th>Prochain Goal</th>
                <th>Type</th>
                <th>Remarque et risque</th>
                <th>Avancement</th>
                
            </tr>
        </thead>
        <tbody>
            
        </tbody>
    </table>
</div>
  )
}

export default DashboardConstComponent