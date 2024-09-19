import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import { addDependency } from "../services/Dependency";
import { listAllSquads } from "../services/Project";

const AddDependency = ({ refreshDependencies, domainId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allSquads, setAllSquads] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [responsibleTeam, setResponsibleTeam] = useState("");
  const [beneficiaryTeam, setBeneficiaryTeam] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [validForm, setValidForm] = useState(true);

  const getSquads = () => {
    listAllSquads()
      .then((response) => {
        setAllSquads(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dependencyData = {
      domainId,
      title,
      priority,
      responsibleTeam,
      beneficiaryTeam,
      scheduledDate,
    };
    if (
      !title ||
      !priority ||
      !responsibleTeam ||
      !beneficiaryTeam ||
      !scheduledDate
    ) {
      setValidForm(false);
      return;
    }
    try {
      const response = await addDependency(dependencyData);
      console.log("Dependency added successfully:", response.data);
      refreshDependencies();
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error("There was an error adding the dependency:", error);
    }
  };
  const resetForm = () => {
     setTitle("");
     setPriority("");
     setResponsibleTeam("");
     setBeneficiaryTeam("");
     setScheduledDate("");
  }
  useEffect(() => {
    if (
      title &&
      priority &&
      responsibleTeam &&
      beneficiaryTeam &&
      scheduledDate
    ) {
      setValidForm(true);
      return;
    }
  }, [title, priority, responsibleTeam, beneficiaryTeam, scheduledDate]);
  useEffect(() => {
    getSquads();
  }, []);
  return (
    <>
      <Button type="primary" onClick={showModal} style={{backgroundColor: "#ec6836", color: "white"}}>
        Ajouter une dépendance
      </Button>
      <Modal
        className="text-center"
        title="Ajouter une dépendance"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <form>
          <div className="form-group mb-2">
            <label className="form-label">Titre :</label>
            <input
              type="text"
              placeholder="Entrer le titre "
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          <div className="form-group mb-2">
            <label className="form-label">Priorité:</label>
            <input
              type="text"
              placeholder="Entrer la priorite"
              name="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          <div className="form-group mb-2">
            <label className="form-label">Equipe Responsable:</label>
            <select
              name="responsibleTeam"
              value={responsibleTeam}
              className={`form-control`}
              onChange={(e) => setResponsibleTeam(e.target.value)}
            >
              <option value="">Sélectionner une équipe</option>
              {allSquads.map((squad) => (
                <option key={squad.id} value={squad.name}>
                  {squad.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group mb-2">
            <label className="form-label">Equipe bénéficiaire:</label>
            <select
              name="beneficiaryTeam"
              value={beneficiaryTeam}
              className={`form-control`}
              onChange={(e) => setBeneficiaryTeam(e.target.value)}
            >
              <option value="">Sélectionner une équipe</option>
              {allSquads.map((squad) => (
                <option key={squad.id} value={squad.name}>
                  {squad.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group mb-2">
            <label className="form-label">Date prévue :</label>
            <input
              type="date"
              name="scheduledDate"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              className={`form-control`}
            ></input>
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

export default AddDependency;
