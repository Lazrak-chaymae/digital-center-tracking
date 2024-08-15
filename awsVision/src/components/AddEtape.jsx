import React, { useState } from "react";
import { Modal } from "antd";
import { PlusCircleOutlined} from '@ant-design/icons'
import { addEtape } from "../services/Etape";


const AddEtape = ({refreshEtape, domain}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const domainId = domain;
  const [name, setName] = useState('');
  
  const handleSubmit = async (e) => {
      e.preventDefault();
      const etape = {domainId, name};
      try {
         const response = await addEtape(etape);
         console.log("Phase added successfully:", response.data);
         refreshEtape();
         setIsModalOpen(false);
      }catch(error){
         console.error("There was an error adding phase :" + error);
      }
  }
  const showModal = () => {
    setIsModalOpen(true);
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  }

  return (
    <>
    <PlusCircleOutlined onClick={showModal} />
    <Modal
      className="text-center"
      title="Ajouter étape "
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <form>
        <div className="form-group mb-2">
          <label className="form-label">Ajouter une étape :</label>
          <input
            type="text"
            placeholder="Entrer une étape"
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

export default AddEtape