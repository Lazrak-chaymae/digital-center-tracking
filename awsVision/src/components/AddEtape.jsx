import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { PlusCircleOutlined} from '@ant-design/icons'
import { addEtape } from "../services/Etape";


const AddEtape = ({refreshEtape, domain}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const domainId = domain;
  const [name, setName] = useState('');
  const [validName, setValidName] = useState(true);
  
  const handleSubmit = async (e) => {
      e.preventDefault();
      const etape = {domainId, name};
        if(!name){
          setValidName(false);
          return;
        }
      try {
         const response = await addEtape(etape);
         console.log("Phase added successfully:", response.data);
         setName('');
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
  useEffect(() => {
    if(name){
      setValidName(true);
      return;
    }
  }, [name])
  return (
    <>
    <PlusCircleOutlined onClick={showModal} style={{color: "#ec6836"}} />
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
        {!validName && 
           <div className="error-message">
              ** Veuillez remplir la case **
           </div>
        }
        <div className="button-container">
        <button className="btn" onClick={(e) => handleSubmit(e)} style={{backgroundColor: "#ec6836", color: "black"}}>
          Ajouter
        </button>
        </div>
      </form>
    </Modal>
  </>
  )
}

export default AddEtape