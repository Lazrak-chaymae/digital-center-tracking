import React, { useEffect, useState } from "react";
import { listdebts } from "../services/DetteTechnique";
import AddDetteTech from "./AddDetteTech";
import { isAdminUser } from "../services/AuthService";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteDebt } from "../services/DetteTechnique";

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
            <th>Type (Compléxité, Duplication, Violation, Instabilité PROD)</th>
            <th>Impact sur le logiciel (S/M/L)</th>
            <th>Coût de correction (S/M/L)</th>
            <th>Volentaire / Involentaire</th>
            <th>Commentaire</th>
            {isAdminUser() && <th></th>}
          </tr>
        </thead>
        <tbody>
          {debts.map((debt) => (
            <tr key={debt.id}>
              <td>{debt.title}</td>
              <td>{debt.type}</td>
              <td>{debt.impact}</td>
              <td>{debt.cost}</td>
              <td>{debt.voluntary}</td>
              <td>
                {debt.comments.map((comment, index) => (
                  <span key={index}>
                    {comment}
                    <br />
                  </span>
                ))}
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
