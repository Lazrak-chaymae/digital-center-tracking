import React, { useState } from "react";
import { Modal } from "antd";
import { PlusCircleOutlined} from '@ant-design/icons'
import { addTask } from "../services/Task";

const AddTask = ({refreshEtape, etapeId, projectId}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [progress, setProgress] = useState('');

    const showModal = () => {
        setIsModalOpen(true);
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const handleSubmit = async (e) => {
          e.preventDefault();
          const task = {name,progress, etapeId, projectId};

          try {
              const response = await addTask(task);
              console.log("Task added successfully :" + response.data);
              refreshEtape();
              setIsModalOpen(false);
          }catch(error){
              console.error("There was an error adding task " + error);
          }

    }
  return (
    <>
    <PlusCircleOutlined onClick={showModal} />
    <Modal
      className="text-center"
      title="Ajouter tache"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <form>
        <div className="form-group mb-2">
          <label className="form-label">Ajouter une tache :</label>
          <input
            type="text"
            placeholder="Entrer une tache"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`form-control`}
          ></input>
        </div>
        <div className="form-group mb-2">
          <label className="form-label">Ajouter l'avancement :</label>
          <input
            type="text"
            placeholder="Entrer l'avancement du tache"
            name="progress"
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
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

export default AddTask