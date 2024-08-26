import React, { useEffect, useState } from "react";
import { listdebts } from "../services/DetteTechnique";
import AddDetteTech from "./AddDetteTech";
import { isAdminUser } from "../services/AuthService";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteDebt } from "../services/DetteTechnique";
import { updateType, updateComments, updateCost, updateImpact, updateTitle, updateVoluntary } from "../services/DetteTechnique";
import TinyCompo from "./TinyCompo";

const DetteTechComponent = () => {
  const [debts, setDebts] = useState([]);
  const domainId = sessionStorage.getItem("domainId");
  const GetDebts = () => {
    listdebts(domainId)
      .then((response) => {
        setDebts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleDebtDelete = (debtId) => {
    deleteDebt(debtId)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleUpdateTitle = async (debtId, e) => {
  
    const updatedTitle = e.target.textContent.trim();
    if (updatedTitle  === '') {
      e.target.classList.add('cell-error');
      GetDebts();
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
      return; 
    }
    try {
      const response = await updateTitle(debtId, updatedTitle );
      console.log(response.data);
  
      e.target.classList.add('cell-success');
      setTimeout(() => {
      e.target.classList.remove('cell-success');
      }, 2000);
    } catch (error) {
      console.error('Error updating Title :', error);
      e.target.classList.add('cell-error');
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
    }
  };
  const handleUpdateImpact= async (debtId, e) => {
  
    const updatedImpact = e.target.textContent.trim();
    if (updatedImpact  === '') {
      e.target.classList.add('cell-error');
      GetDebts();
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
      return; 
    }
    try {
      const response = await updateImpact(debtId, updatedImpact );
      console.log(response.data);
  
      e.target.classList.add('cell-success');
      setTimeout(() => {
      e.target.classList.remove('cell-success');
      }, 2000);
    } catch (error) {
      console.error('Error updating Impact :', error);
      e.target.classList.add('cell-error');
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
    }
  };
  const handleUpdateCost= async (debtId, e) => {
  
    const updatedCost = e.target.textContent.trim();
    if (updatedCost  === '') {
      e.target.classList.add('cell-error');
      GetDebts();
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
      return; 
    }
    try {
      const response = await updateCost(debtId, updatedCost );
      console.log(response.data);
  
      e.target.classList.add('cell-success');
      setTimeout(() => {
      e.target.classList.remove('cell-success');
      }, 2000);
    } catch (error) {
      console.error('Error updating Cost :', error);
      e.target.classList.add('cell-error');
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
    }
  };
  
  const handleUpdateType = async (debtId, e) => {
  
    const updatedType = e.target.textContent.trim();
    if (updatedType === '') {
      e.target.classList.add('cell-error');
      GetDebts();
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
      return; 
    }
    try {
      const response = await updateType(debtId, updatedType);
      console.log(response.data);
  
      e.target.classList.add('cell-success');
      setTimeout(() => {
      e.target.classList.remove('cell-success');
      }, 2000);
    } catch (error) {
      console.error('Error updating Type:', error);
      e.target.classList.add('cell-error');
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
    }
  };
  const handleUpdateVoluntary = async (debtId, e) => {
  
    const updatedVoluntary = e.target.textContent.trim();
    if (updatedVoluntary === '') {
      e.target.classList.add('cell-error');
      GetDebts();
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
      return; 
    }
    try {
      const response = await updateVoluntary(debtId, updatedVoluntary);
      console.log(response.data);
  
      e.target.classList.add('cell-success');
      setTimeout(() => {
      e.target.classList.remove('cell-success');
      }, 2000);
    } catch (error) {
      console.error('Error updating Voluntary:', error);
      e.target.classList.add('cell-error');
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
    }
  };
  const handleUpdateComment = async (debtId, index, e) => {
  
    const updatedComment = e.target.textContent.trim();
    if (updatedComment === '') {
      e.target.classList.add('cell-error');
      GetDebts();
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
      return; 
    }
    try {
      const response = await updateComments(debtId, index, updatedComment);
      console.log(response.data);
  
      e.target.classList.add('cell-success');
      setTimeout(() => {
      e.target.classList.remove('cell-success');
      }, 2000);
    } catch (error) {
      console.error('Error updating Comment:', error);
      e.target.classList.add('cell-error');
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
    }
  };
  const handleUpdate = async( { handleFc, debtId, value }) => {
        
    try {
   
      const response = await handleFc(debtId, value);
      console.log(response.data);
    } catch (error) {
      console.error('Error updating debt informations :', error);
    }
  }
  useEffect(() => {
    GetDebts();
  }, [debts]);

  return (
    <div className="container" style={{ paddingTop: "12px" }}>
      <h3 className="text-center"> Dette technique </h3>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Type</th>
            <th>Impact sur le logiciel </th>
            <th>Coût de correction </th>
            <th>Volentaire / Involentaire</th>
            <th>Commentaire</th>
            {isAdminUser() && <th></th>}
          </tr>
        </thead>
        <tbody>
          {debts.map((debt) => (
            <tr key={debt.id}>
              <td
              contentEditable={isAdminUser ? 'true' : 'false'}
              onBlur={(e) => handleUpdate({ handleFc: updateTitle,debtId: debt.id, value: e.target.textContent.trim()})}
              suppressContentEditableWarning={true}
              >{debt.title}</td>
              <td
              contentEditable={isAdminUser ? 'true' : 'false'}
              onBlur={(e) => handleUpdate({ handleFc: updateType,debtId: debt.id, value: e.target.textContent.trim()})}
              suppressContentEditableWarning={true}
              >{debt.type}</td>
              <td
              contentEditable={isAdminUser ? 'true' : 'false'}
              onBlur={(e) => handleUpdate({ handleFc: updateImpact,debtId: debt.id, value: e.target.textContent.trim()})}
              suppressContentEditableWarning={true}
              >{debt.impact}</td>
              <td
              contentEditable={isAdminUser ? 'true' : 'false'}
              onBlur={(e) => handleUpdate({ handleFc: updateCost,debtId: debt.id, value: e.target.textContent.trim()})}
              suppressContentEditableWarning={true}
              >{debt.cost}</td>
              <td
              contentEditable={isAdminUser ? 'true' : 'false'}
              onBlur={(e) => handleUpdate({ handleFc: updateVoluntary,debtId: debt.id, value: e.target.textContent.trim()})}
              suppressContentEditableWarning={true}
              >{debt.voluntary}</td>
              <td>
                <TinyCompo id={debt.id} value={debt.comments} fonction={updateComments} admin={isAdminUser}/>
              </td>
            
              {isAdminUser() && (
                <td>
                  <DeleteOutlined onClick={() => handleDebtDelete(debt.id)} />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {isAdminUser() && (
        <AddDetteTech refreshDebts={GetDebts} domainId={domainId} />
      )}
      
    </div>
  );
};

export default DetteTechComponent;
