import React, { useState } from "react";
import { Modal } from "antd";
import { PlusCircleOutlined} from '@ant-design/icons'
import { addMilestone } from "../services/Project";

const AddMilestone = ({ refreshProject, projectId }) => {
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
    const milestone = {name};
    
    try {
      const response = await addMilestone(milestone, projectId);
      console.log("Milestone added successfully:", response.data);
      refreshProject();
      setIsModalOpen(false);
    } catch (error) {
      console.error("There was an error adding the Milestone:", error);
    }
  };
  return (
    <>
      <PlusCircleOutlined onClick={showModal} />
      <Modal
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
          <button className="btn btn-success" onClick={(e) => handleSubmit(e)}>
            Ajouter
          </button>
        </form>
      </Modal>
    </>
  );
};

export default AddMilestone;
