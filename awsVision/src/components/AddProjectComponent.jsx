import React, { useEffect, useState } from "react";
import { addProject, listSquads } from "../services/Project";
import {Alert } from "antd"
import { equals } from "validator";


const AddProjectComponent = () => {
  const status = "EnConstruction";
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [startDate, setStartDate] = useState("");
  const [expectedEndDate, setExpectedEndDate] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");
  const [allocatedSprintCount, setAllocatedSprintCount] = useState("");
  const [allSquads, setAllSquads] = useState([]);
  const [squad, setSquad] = useState({ id: "", name: "" });
  const [validProject, setValidProject] = useState(true);
  const [success,setSuccess] = useState(false);
  const [validDate, setValidDate] = useState(true);
  const domainId = 1;

  const getSquads = () => {
    listSquads(domainId)
      .then((response) => {
        setAllSquads(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleClose = () =>{
     setSuccess(false);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const projectData = {
      domainId,
      name,
      owner,
      startDate,
      expectedEndDate,
      type,
      budget,
      description,
      allocatedSprintCount,
      squad,
      status,
    };
    if (
      !name ||
      !owner ||
      !startDate ||
      !expectedEndDate ||
      !type ||
      !budget ||
      !description ||
      !allocatedSprintCount ||
      !squad
    ) {
      setValidProject(false);
      return;
    }
    addProject(projectData)
      .then((response) => {
        console.log("Project added successfully:", response.data);
        setSuccess(true);
        resetForm();
      })
      .catch((error) => {
        console.error("There was an error adding the project:", error);
      });
  };
  const resetForm = () => {
    setName("");
    setOwner("");
    setStartDate("");
    setExpectedEndDate("");
    setType("");
    setBudget("");
    setDescription("");
    setAllocatedSprintCount("");
    setSquad({ id: "", name: "" });
  };
  const handleSquadChange = (e) => {
    const selectedSquad = allSquads.find(
      (s) => s.id === parseInt(e.target.value)
    );
    if (selectedSquad) {
      setSquad({ id: selectedSquad.id, name: selectedSquad.name });
    }
  };

  useEffect(() => {
    if (
        name ||
        owner ||
        startDate ||
        expectedEndDate ||
        type ||
        budget ||
        description ||
        allocatedSprintCount ||
        squad
      ) {
        setValidProject(true);
        return;
      }
     
  }, []);
  useEffect(() => {
    if (startDate && expectedEndDate && startDate >= expectedEndDate){
      setValidDate(false);
   }else {
     setValidDate(true);
   }
  }, [startDate,expectedEndDate])
  useEffect(() => {
    getSquads();
  }, []);
  return (
    <div className="center-container" style={{ paddingTop: "10px" }}>
      
      <div className="forms">
      {success &&  <Alert message="Projet créé avec succes" type="success" showIcon closable afterClose={handleClose} />}
        <form>
          <div className="form-group mb-2">
            <label className="form-label">Nom :</label>
            <input
              type="text"
              placeholder="Entrer le nom du projet"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          <div className="form-group mb-2">
            <label className="form-label">Owner :</label>
            <input
              type="text"
              placeholder="Entrer le nom du owner"
              name="owner"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          <div className="form-group mb-2">
            <label className="form-label">Date début:</label>
            <input
              type="date"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          <div className="form-group mb-2">
            <label className="form-label">Date fin prevue:</label>
            <input
              type="date"
              placeholder="Entrer la date de fin prevue du projet"
              name="expectedEndDate"
              value={expectedEndDate}
              onChange={(e) => setExpectedEndDate(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          <div className="form-group mb-2">
            <label className="form-label">Type:</label>
            <input
              type="text"
              placeholder="Entrer le type du projet"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          <div className="form-group mb-2">
            <label className="form-label">Budget:</label>
            <input
              type="text"
              placeholder="Entrer le budget du projet"
              name="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          <div className="form-group mb-2">
            <label className="form-label">Description:</label>
            <input
              type="text"
              placeholder="Entrer la description du projet"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`form-control`}
            ></input>
          </div>

          <div className="form-group mb-2">
            <label className="form-label">Nombre de sprint alloués:</label>
            <input
              type="text"
              placeholder="Entrer le nombre de sprint alloués"
              name="allocatedSprintCount"
              value={allocatedSprintCount}
              onChange={(e) => setAllocatedSprintCount(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          <div className="form-group mb-2">
            <label className="form-label">Squad:</label>
            <select
              name="squad"
              className={`form-control`}
              onChange={handleSquadChange}
              value={squad.id}
            >
              <option value="">Sélectionner une squad</option>
              {allSquads.map((squad) => (
                <option key={squad.id} value={squad.id}>
                  {squad.name}
                </option>
              ))}
            </select>
          </div>
          {!validProject && (
            <div className="error-message">
              ** Veuillez remplir tous les champs requis **
            </div>
          )}
          {!validDate && (
            <div className="error-message">
            ** Attention! La date fin du projet est inférieure du date de début du projet  **
          </div>
          )}
          <div className="button-container">
            <button
              className="btn btn-primary"
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectComponent;
