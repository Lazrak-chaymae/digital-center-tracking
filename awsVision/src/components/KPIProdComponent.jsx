import { useEffect, useState } from 'react'
import { deleteKPI, listKPIs } from '../services/KPIBusiness';
import AddKPIProd from './AddKPIProd';
import { isAdminUser } from '../services/AuthService';
import { DeleteOutlined } from "@ant-design/icons";


const KPIProdComponent = () => {
    const [dataSource, setDataSource] = useState([]);
    const kpiTypes = ['Habituels', 'Vedettes', 'Qualité'];
    const domainId = sessionStorage.getItem("domainId");

    const fetchData = async () => {
        const data = {};
        const promises = kpiTypes.map(async (type) => {
            try {
                const response = await listKPIs(type, domainId);
                data[type] = response.data;
            } catch (error) {
                console.error(error);
            }
        });
        await Promise.all(promises);
        setDataSource(data);
    };
     const handleKPIDelete = (kpiId) => {
          deleteKPI(kpiId).then((response) => {
             console.log(response.data);
             fetchData();
          }).catch ((error) => {
              console.error(error);
          })
     }
    useEffect(() => {
        fetchData();
    }, [kpiTypes]);




    return (
        <div className='container'  style={{ paddingTop: '12px'}}>
            <h3 className='text-center'>Principaux KPIs Business</h3>
            
                {kpiTypes.map(type => (
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
                            {isAdminUser() &&
                            <th></th>
                            }
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
                                    {isAdminUser() &&
                                    <td><DeleteOutlined onClick={() => handleKPIDelete(kpi.id)} /></td>
                                    }
                            </tr>
                            ))}
                    </tbody>
                </table>
                       </div>
                       


                ))}
               
                
               {isAdminUser() &&  <AddKPIProd  refreshKPIs={fetchData} domainId={domainId} /> }
        </div>


    )
}

export default KPIProdComponent