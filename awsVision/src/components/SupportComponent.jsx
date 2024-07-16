import React from 'react'

const SupportComponent = () => {
  return (
    <div className='container' style={{ paddingTop : '12px'}}>
    <h3 className='text-center'>Activité Support N3</h3>
    <table className='table table-striped table-bordered'>
        <thead>
            <tr>
                <th>Nombre des tickets support sur le dernier mois par Squad</th>
                <th>Effort mobilisé</th>
                </tr>
        </thead>
        <tbody>
            
        </tbody>
    </table>
    <p>Calcul: Pourcentage de l’effort mobilisé par rapport à la capacité de l’équipe (Somme de complexité /Vélocité)</p>
    <table className='table table-striped table-bordered'>
        <thead>
            <tr>
                <th>Top 3 des sujets en support N3</th>
                </tr>
        </thead>
        <tbody>
            
        </tbody>
    </table>
</div>
  )
}

export default SupportComponent