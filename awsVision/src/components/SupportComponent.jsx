import React, { useEffect, useState } from "react";
import { supportItem } from "../services/Support";
import AddSupport from "./AddSupport";
import { isAdminUser } from "../services/AuthService";
import { updateTicketCount } from "../services/Support";
import { updateEffortSpent } from "../services/Support";
import { updateTopSubjects } from "../services/Support";

const SupportComponent = () => {
  const [support, setSupport] = useState({});
  const domainId = sessionStorage.getItem("domainId");
 
  const getSupport = () => {
    supportItem(domainId)
      .then((response) => {
        setSupport(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
 
  const handleUpdate = async( { handleFc, supportId, value, index }) => {
        
    try {

    let response;
    if (index !== undefined && index !== null) {
      response = await handleFc(supportId, index, value);
      console.log(response.data);
    } else {
      response = await handleFc(supportId, value);
      console.log(response.data);
    }
      
    } catch (error) {
      console.error('Error updating support informations :', error);
    }
  }

 
  

  useEffect(() => {
    getSupport();
  }, [support]);

  const isEmptySupport = !support.ticketCount && !support.effortSpent && (!support.topSubjects || support.topSubjects.length === 0);
  
  return (
    <div className="container" style={{ paddingTop: "12px" }}>
      <h3 className="text-center">Activité Support N3</h3>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Nombre des tickets support sur le dernier mois par Squad</th>
            <th>Effort mobilisé</th>
          </tr>
        </thead>
        {support && (
        <tbody>
          
            <tr key={support.id}>
              <td
               contentEditable={isAdminUser ? 'true' : 'false'}
               onBlur={(e) => handleUpdate({handleFc: updateTicketCount, supportId: support.id, value: e.target.textContent.trim()})}
               suppressContentEditableWarning={true}
              >{support.ticketCount}</td>
               
              <td
              contentEditable={isAdminUser ? 'true' : 'false'}
              onBlur={(e) => handleUpdate({handleFc: updateEffortSpent,  supportId: support.id, value: e.target.textContent.trim()})}
              suppressContentEditableWarning={true}
              >{support.effortSpent}</td>
            </tr>
        </tbody>
        )}
      </table>
      <p>
        Calcul: Pourcentage de l’effort mobilisé par rapport à la capacité de
        l’équipe (Somme de complexité /Vélocité)
      </p>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Top 3 des sujets en support N3</th>
          </tr>
        </thead>
        <tbody>
          {support.topSubjects && support.topSubjects.map((subject, index) => (
              <tr key={index}>
                <td
                contentEditable={isAdminUser ? 'true' : 'false'}
                onBlur={(e) => handleUpdate({handleFc: updateTopSubjects, supportId: support.id,  value: e.target.textContent.trim(), index: index})}
                suppressContentEditableWarning={true}
                >{subject}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      {isEmptySupport && isAdminUser() && <AddSupport refreshSupport={getSupport} domainId={domainId} />}
    </div>
  );
};

export default SupportComponent;
