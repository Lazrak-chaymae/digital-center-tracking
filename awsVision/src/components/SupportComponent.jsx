import React, { useEffect, useState } from "react";
import { supportItem } from "../services/Support";
import AddSupport from "./AddSupport";
import { isAdminUser } from "../services/AuthService";

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

  useEffect(() => {
    getSupport();
  }, []);

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
              <td>{support.ticketCount}</td>
              <td>{support.effortSpent}</td>
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
                <td>{subject}</td>
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
