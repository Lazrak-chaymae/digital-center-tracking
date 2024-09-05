import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { PlusCircleOutlined} from '@ant-design/icons'
import { addMilestone } from "../services/Project";

const AddMilestone = ({ refreshProject, projectId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(true);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const milestone = {name};
    if (!name) {
        setValidName(false);
        return ;
    }
    try {
      const response = await addMilestone(milestone, projectId);
      console.log(response.data);
      setName("");
      refreshProject();
      setIsModalOpen(false);
    } catch (error) {
      console.error("There was an error adding the Milestone:", error);
    }
  
  };
  useEffect(() => {
    if (name) {
      setValidName(true);
      return ;
  }
  } ,[name])
  return (
    <>
      <PlusCircleOutlined onClick={showModal}
      style={{ color: "#ec6838"}}
      />
      <Modal
       className="text-center"
        title="Ajouter Fait marquant"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <form>
          <div className="form-group mb-2">
            <label className="form-label">Fait marquant :</label>
            <input
              type="text"
              placeholder="Entrer le fait marquant du projet "
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          {!validName &&  
          <div className="error-message">
               ** Veuillez remplir la case **
          </div>
          }
          <div className="button-container">
          <button className="btn"
          style={{backgroundColor: "#ec6836", color: "white"}}
          onClick={(e) => handleSubmit(e)}>
            Ajouter
          </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddMilestone;
