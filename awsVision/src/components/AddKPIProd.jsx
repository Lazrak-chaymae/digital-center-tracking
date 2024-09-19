import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import { addKPI } from "../services/KPIBusiness";

const AddKPIProd = ({ refreshKPIs, domainId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const kpiTypes = ["Habituels", "Vedettes", "Qualité"];
  const [functionality, setFunctionality] = useState("");
  const [indicator, setIndicator] = useState("");
  const [planned, setPlanned] = useState("");
  const [achieved, setAchieved] = useState("");
  const [previousMeasure, setPreviousMeasure] = useState("");
  const [type, setType] = useState("");
  const [validForm, setValidForm] = useState(true);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const kpiData = {
      domainId,
      functionality,
      indicator,
      planned,
      achieved,
      previousMeasure,
      type,
    };
    if (
      !functionality ||
      !indicator ||
      !planned ||
      !achieved ||
      !previousMeasure ||
      !type
    ) {
      setValidForm(false);
      return;
    }
    try {
      const response = await addKPI(kpiData);
      console.log("KPI added successfully:", response.data);
      refreshKPIs();
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error("There was an error adding the KPI:", error);
    }
  };
  const resetForm = () => {
    setFunctionality("");
    setIndicator("");
    setAchieved("");
    setPlanned("");
    setPreviousMeasure("");
    setType("");
  };
  useEffect(() => {
    if (
      functionality &&
      indicator &&
      planned &&
      achieved &&
      previousMeasure &&
      type
    ) {
      setValidForm(true);
      return;
    }
  }, [functionality, indicator, planned, achieved, previousMeasure, type]);
  return (
    <>
      <Button type="primary" onClick={showModal}
      style={{backgroundColor: "#ec6836", color: "white"}}
      >
        Ajouter une KPI
      </Button>
      <Modal
        className="text-center"
        title="Ajouter une KPI"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <form>
          <div className="form-group mb-2">
            <label className="form-label">Fonctionnalité :</label>
            <input
              type="text"
              placeholder="Entrer la fonctionnalité"
              name="functionality"
              value={functionality}
              onChange={(e) => setFunctionality(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          <div className="form-group mb-2">
            <label className="form-label">Indicateur :</label>
            <input
              type="text"
              placeholder="Entrer la version"
              name="indicator"
              value={indicator}
              onChange={(e) => setIndicator(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          <div className="form-group mb-2">
            <label className="form-label">Prévu :</label>
            <input
              type="text"
              placeholder="Entrer Prévu"
              name="planned"
              value={planned}
              onChange={(e) => setPlanned(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          <div className="form-group mb-2">
            <label className="form-label">Réalisé:</label>
            <input
              type="text"
              placeholder="Entrer Réalisé"
              name="achieved"
              value={achieved}
              onChange={(e) => setAchieved(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          <div className="form-group mb-2">
            <label className="form-label">Précédente mesure :</label>
            <input
              type="text"
              placeholder="Entrer Précédente mesure"
              name="previousMeasure"
              value={previousMeasure}
              onChange={(e) => setPreviousMeasure(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          <div className="form-group mb-2">
            <label className="form-label">Type:</label>
            <select
              name="type"
              value={type}
              className={`form-control`}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Sélectionner le type du KPI</option>
              {kpiTypes.map((kpiType) => (
                <option key={kpiType} value={kpiType}>
                  {kpiType}
                </option>
              ))}
            </select>
          </div>
          {!validForm && 
             <div className="error-message">
                ** Veuillez remplir toutes les cases **
             </div>
          }
          <div className="button-container">
            <button
              className="btn"
              onClick={(e) => handleSubmit(e)}
              style={{backgroundColor: "#ec6836", color: "white"}}
            >
              Ajouter
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddKPIProd;
