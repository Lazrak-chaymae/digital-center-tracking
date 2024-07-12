import { useEffect, useState } from 'react'
import { listKPIs } from '../services/KPIBusiness';


const KPIProdComponent = () => {
    const [dataSource, setDataSource] = useState([]);
    const [kpiType,setKpiType] = useState(['Habituels','Vedettes','Qualité']);
    
    useEffect(() => {
        const data = {};
        for(const type of kpiType){
            listKPIs(type).then((response) => {
               data[type] = response.data;
            })
            .catch(error => {
                console.error(error);
            })
        }
        setDataSource(data); 

    }, [kpiType])



    return (
        <div className='container' style={{padding : '12px'}}>
            <h3 className='text-center'>Principaux KPIs Business</h3>
            
                {kpiType.map(type => (
                       <div key={type}>
                         <h4>{type}</h4>
                         <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>Fonctionnalité</th>
                            <th>Indicateur</th>
                            <th>Prévu</th>
                            <th>Réalisé</th>
                            <th>Précédente mesure</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataSource[type] && dataSource[type].map(
                            kpi => (
                                <tr key={kpi.id}>
                                 <td>{kpi.functionality}</td>
                                    <td>{kpi.indicator}</td>
                                    <td>{kpi.planned}</td>
                                    <td>{kpi.achieved}</td>
                                    <td>{kpi.previousMeasure}</td>
                            </tr>
                            ))}
                    </tbody>
                </table>
                       </div>
                       


                ))}
               
                

        </div>


    )
}

export default KPIProdComponent