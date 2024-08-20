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

 
  const handleUpdateTicketCount = async (e, supportId) => {
  
    const updatedCount = e.target.textContent.trim();
    if (updatedCount === '') {
      e.target.classList.add('cell-error');
      getSupport();
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
      return; 
    }
    try {
      const response = await updateTicketCount(supportId, updatedCount);
      console.log(response.data);
  
      e.target.classList.add('cell-success');
      setTimeout(() => {
      e.target.classList.remove('cell-success');
      }, 2000);
    } catch (error) {
      console.error('Error updating ticket count:', error);
      e.target.classList.add('cell-error');
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
    }
  };
  const handleUpdateEffortSpent = async (e, supportId) => {
  
    const updatedEffort = e.target.textContent.trim();
    if (updatedEffort === '') {
      e.target.classList.add('cell-error');
      getSupport();
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
      return; 
    }
    try {
      const response = await updateEffortSpent(supportId, updatedEffort);
      console.log(response.data);
  
      e.target.classList.add('cell-success');
      setTimeout(() => {
      e.target.classList.remove('cell-success');
      }, 2000);
    } catch (error) {
      console.error('Error updating Effort :', error);
      e.target.classList.add('cell-error');
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
    }
  };
  const handleUpdateTopSubject = async (e, index, supportId) => {
  
    const updatedSubject = e.target.textContent.trim();
    if (updatedSubject === '') {
      e.target.classList.add('cell-error');
      getSupport();
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
      return; 
    }
    try {
      const response = await updateTopSubjects(supportId, index, updatedSubject);
      console.log(response.data);
  
      e.target.classList.add('cell-success');
      setTimeout(() => {
      e.target.classList.remove('cell-success');
      }, 2000);
    } catch (error) {
      console.error('Error updating Subject:', error);
      e.target.classList.add('cell-error');
      setTimeout(() => {
        e.target.classList.remove('cell-error');
      }, 2000);
    }
  };
  

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
               onBlur={(e) => handleUpdateTicketCount(e, support.id)}
               suppressContentEditableWarning={true}
              >{support.ticketCount}</td>
              <td
              contentEditable={isAdminUser ? 'true' : 'false'}
              onBlur={(e) => handleUpdateEffortSpent(e, support.id)}
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
                onBlur={(e) => handleUpdateTopSubject(e, index, support.id)}
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
