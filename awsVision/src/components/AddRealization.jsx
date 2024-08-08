import React, { useState } from "react";
import { Modal } from "antd";
import { PlusCircleOutlined} from '@ant-design/icons'
import { addRealization } from "../services/Project";

const AddRealization = ({ refreshProject, projectId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");
  
    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      const realization = {name};
      try {
        const response = await addRealization(realization, projectId);
        console.log("Realization added successfully:", response.data);
        refreshProject();
        setIsModalOpen(false);
      } catch (error) {
        console.error("There was an error adding the Realization:", error);
      }
    };
  return (
    <>
    <PlusCircleOutlined onClick={showModal} />
    <Modal
      className="text-center"
      title="Ajouter Fait marquant"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <form>
        <div className="form-group mb-2">
          <label className="form-label">Prochains réalisation :</label>
          <input
            type="text"
            placeholder="Entrer une réalisation "
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`form-control`}
          ></input>
        </div>
        <div className="button-container">
        <button className="btn btn-primary" onClick={(e) => handleSubmit(e)}>
          Ajouter
        </button>
        </div>
      </form>
    </Modal>
  </>
  )
}

export default AddRealization