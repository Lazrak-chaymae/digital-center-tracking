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

     const handleUpdateFunctionality = async (kpiId, e) => {
  
        const updatedFunctionality = e.target.textContent.trim();
        if (updatedFunctionality === '') {
          e.target.classList.add('cell-error');
          fetchData();
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
          return; 
        }
        try {
          const response = await updateFunctionality(kpiId, updatedFunctionality);
          console.log(response.data);
      
          e.target.classList.add('cell-success');
          setTimeout(() => {
          e.target.classList.remove('cell-success');
          }, 2000);
        } catch (error) {
          console.error('Error updating Functionality:', error);
          e.target.classList.add('cell-error');
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
        }
      };
      const handleUpdateIndicator = async (kpiId, e) => {
  
        const updatedIndicator = e.target.textContent.trim();
        if (updatedIndicator === '') {
          e.target.classList.add('cell-error');
          fetchData();
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
          return; 
        }
        try {
          const response = await updateIndicator(kpiId, updatedIndicator);
          console.log(response.data);
      
          e.target.classList.add('cell-success');
          setTimeout(() => {
          e.target.classList.remove('cell-success');
          }, 2000);
        } catch (error) {
          console.error('Error updating Indicator:', error);
          e.target.classList.add('cell-error');
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
        }
      };
      const handleUpdateAchieved = async (kpiId, e) => {
  
        const updatedAchieved = e.target.textContent.trim();
        if (updatedAchieved === '') {
          e.target.classList.add('cell-error');
          fetchData();
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
          return; 
        }
        try {
          const response = await updateAchieved(kpiId, updatedAchieved);
          console.log(response.data);
      
          e.target.classList.add('cell-success');
          setTimeout(() => {
          e.target.classList.remove('cell-success');
          }, 2000);
        } catch (error) {
          console.error('Error updating Achieved:', error);
          e.target.classList.add('cell-error');
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
        }
      };
      const handleUpdatePlanned = async (kpiId, e) => {
  
        const updatedPlanned = e.target.textContent.trim();
        if (updatedPlanned === '') {
          e.target.classList.add('cell-error');
          fetchData();
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
          return; 
        }
        try {
          const response = await updatePlanned(kpiId, updatedPlanned);
          console.log(response.data);
      
          e.target.classList.add('cell-success');
          setTimeout(() => {
          e.target.classList.remove('cell-success');
          }, 2000);
        } catch (error) {
          console.error('Error updating Planned:', error);
          e.target.classList.add('cell-error');
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
        }
      };
      const handleUpdateMeasure = async (kpiId, e) => {
  
        const updatedMeasure = e.target.textContent.trim();
        if (updatedMeasure === '') {
          e.target.classList.add('cell-error');
          fetchData();
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
          return; 
        }
        try {
          const response = await updatePreviousMeasure(kpiId, updatedMeasure);
          console.log(response.data);
      
          e.target.classList.add('cell-success');
          setTimeout(() => {
          e.target.classList.remove('cell-success');
          }, 2000);
        } catch (error) {
          console.error('Error updating Measure:', error);
          e.target.classList.add('cell-error');
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
        }
      };
      
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
                                    onBlur={(e) => handleUpdateFunctionality(kpi.id, e)}
                                    suppressContentEditableWarning={true}
                                    >{kpi.functionality}</td>
                                    <td
                                    contentEditable={isAdminUser ? 'true' : 'false'}
                                    onBlur={(e) => handleUpdateIndicator(kpi.id, e)}
                                    suppressContentEditableWarning={true}
                                    >{kpi.indicator}</td>
                                    <td
                                     contentEditable={isAdminUser ? 'true' : 'false'}
                                     onBlur={(e) => handleUpdatePlanned(kpi.id, e)}
                                     suppressContentEditableWarning={true}
                                    >{kpi.planned}</td>
                                    <td
                                     contentEditable={isAdminUser ? 'true' : 'false'}
                                     onBlur={(e) => handleUpdateAchieved(kpi.id, e)}
                                     suppressContentEditableWarning={true}
                                    >{kpi.achieved}</td>
                                    <td
                                     contentEditable={isAdminUser ? 'true' : 'false'}
                                     onBlur={(e) => handleUpdateMeasure(kpi.id, e)}
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