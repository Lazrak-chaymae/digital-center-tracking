import React, {useState} from 'react'
import { Button, Modal } from "antd";
import { PlusCircleOutlined} from '@ant-design/icons'
import { addRemarkOrRisk } from '../services/Project';

const AddRemarkOrRisk = ({refreshProject, projectId}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [importance, setImportance] = useState('');
    
    const showModal = () => {
        setIsModalOpen(true);
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const remarkOrRiskData = {
            name,
            importance
        };
        try {
            const response = await addRemarkOrRisk(remarkOrRiskData, projectId);
            console.log("Remark / Risk added successfully:", response.data);
            refreshProject();
            setIsModalOpen(false);
          } catch (error) {
            console.error("There was an error adding the Remark / Risk:", error);
          }
        };
  return (
     <>
    {/* <Button type="primary" onClick={showModal}>
       <PlusCircleOutlined />
    </Button> */}
    <PlusCircleOutlined onClick={showModal} />
    <Modal
      title="Ajouter une remarque ou un risque"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <form>
        <div className="form-group mb-2">
          <label className="form-label">Remarque ou Risque :</label>
          <input
            type="text"
            placeholder="Entrer la remarque ou le risque "
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`form-control`}
          ></input>
        </div>
        <div className="form-group mb-2">
          <label className="form-label">Importance :</label>
          <input
            type="text"
            placeholder="Entrer l'importance du risque ou du remarque"
            name="importance"
            value={importance}
            onChange={(e) => setImportance(e.target.value)}
            className={`form-control`}
          ></input>
        </div>
    
        <button className="btn btn-success" onClick={(e) => handleSubmit(e)}>
          Ajouter
        </button>
      </form>
    </Modal>
  </>
  )
}

export default AddRemarkOrRisk