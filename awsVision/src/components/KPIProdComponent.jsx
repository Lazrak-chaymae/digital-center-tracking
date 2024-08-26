import { useEffect, useState } from 'react'
import { deleteKPI, listKPIs } from '../services/KPIBusiness';
import AddKPIProd from './AddKPIProd';
import { isAdminUser } from '../services/AuthService';
import { DeleteOutlined } from "@ant-design/icons";
import { updateFunctionality, updateIndicator, updatePlanned, updateAchieved, updatePreviousMeasure } from '../services/KPIBusiness';


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
      const handleUpdate = async(handleFc, kpiId, value) => {
        
        try {
          const response = await handleFc(kpiId, value);
          console.log(response.data);
        } catch (error) {
          console.error('Error updating KPI informations :', error);
        }
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
                                    <td
                                    contentEditable={isAdminUser ? 'true' : 'false'}
                                    onBlur={(e) => handleUpdate(updateFunctionality, kpi.id, e.target.textContent.trim())}
                                    suppressContentEditableWarning={true}
                                    >{kpi.functionality}</td>
                                    <td
                                    contentEditable={isAdminUser ? 'true' : 'false'}
                                    onBlur={(e) => handleUpdate(updateIndicator, kpi.id, e.target.textContent.trim())}
                                    suppressContentEditableWarning={true}
                                    >{kpi.indicator}</td>
                                    <td
                                     contentEditable={isAdminUser ? 'true' : 'false'}
                                     onBlur={(e) => handleUpdate(updatePlanned, kpi.id, e.target.textContent.trim())}
                                     suppressContentEditableWarning={true}
                                    >{kpi.planned}</td>
                                    <td
                                     contentEditable={isAdminUser ? 'true' : 'false'}
                                     onBlur={(e) => handleUpdate(updateAchieved, kpi.id, e.target.textContent.trim())}
                                     suppressContentEditableWarning={true}
                                    >{kpi.achieved}</td>
                                    <td
                                     contentEditable={isAdminUser ? 'true' : 'false'}
                                     onBlur={(e) => handleUpdate(updatePreviousMeasure, kpi.id, e.target.textContent.trim())}
                                     suppressContentEditableWarning={true}
                                    >{kpi.previousMeasure}</td>
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

