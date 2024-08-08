import React,{useState} from 'react';
import { Modal } from "antd";
import { PlusCircleOutlined} from '@ant-design/icons'
import { addKPI } from '../services/Project';


const AddKpiPilotage = ({refreshProject, projectId}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [target, setTarget] = useState('');
    const [current, setCurrent] = useState('');

    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        const kpiData = {
          name,
          current,
          target,
        };
        try {
            const response = await addKPI(kpiData, projectId);
            console.log("KPI added successfully:", response.data);
            refreshProject();
            setIsModalOpen(false);
          } catch (error) {
            console.error("There was an error adding the KPI:", error);
          }
        };
    return (
    <>
       <PlusCircleOutlined onClick={showModal}/>
    <Modal
     className="text-center"
      title="Ajouter une KPI"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <form>
        <div className="form-group mb-2">
          <label className="form-label">Nom du KPI :</label>
          <input
            type="text"
            placeholder="Entrer le nom du KPI "
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`form-control`}
          ></input>
        </div>
        <div className="form-group mb-2">
          <label className="form-label">Cible :</label>
          <input
            type="text"
            placeholder="Entrer Cible"
            name="target"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className={`form-control`}
          ></input>
        </div>
        <div className="form-group mb-2">
          <label className="form-label">Actuel:</label>
          <input
            type="text"
            placeholder="Entrer Actuel"
            name="current"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            className={`form-control`}
          ></input>
        </div>
        <div className='button-container'>
        <button className="btn btn-primary" onClick={(e) => handleSubmit(e)}>
          Ajouter
        </button>
        </div>
      </form>
    </Modal>
  </>
  )
}

export default AddKpiPilotage