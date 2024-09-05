import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { PlusCircleOutlined} from '@ant-design/icons'
import { addTask } from "../services/Task";

const AddTask = ({refreshEtape, etapeId, projectId}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [progress, setProgress] = useState('');
    const [validName, setValidName] = useState(true);

    const showModal = () => {
        setIsModalOpen(true);
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const handleSubmit = async (e) => {
          e.preventDefault();
          const task = {name,progress, etapeId, projectId};
          if(!name || !progress){
              setValidName(false);
              return ;
          }
          try {
              const response = await addTask(task);
              console.log("Task added successfully :" + response.data);
              setName('');
              setProgress('');
              refreshEtape();
              setIsModalOpen(false);
          }catch(error){
              console.error("There was an error adding task " + error);
          }

    }
    useEffect(() => {
      if(name && progress){
        setValidName(true);
        return ;
    }
    } , [name, progress])
  return (
    <>
    <PlusCircleOutlined onClick={showModal} 
    
    />
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
        {!validName && 
           <div className="error-message">
                ** Veuillez remplir toutes les cases ** 
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
  )
}

export default AddTask