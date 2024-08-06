import React, { useState } from 'react'
import { Button, Modal } from "antd";
import { addSupport } from '../services/Support';

const AddSupport = ({refreshSupport}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ticketCount, setTicketCount] = useState('');
    const [effortSpent, setEffortSpent] = useState('');
    const [topSubjects, setTopSubjects] = useState([]);
    
    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        const supportData = {
          ticketCount,
          effortSpent,
          topSubjects: topSubjects.split(',').map(subject => subject.trim()), 
        };
    
        try {
          const response = await addSupport(supportData);
          console.log("Support activity added successfully:", response.data);
          refreshSupport();
          setIsModalOpen(false);
        } catch (error) {
          console.error("There was an error adding the support activity:", error);
        }
      };
   
  return (
    <>
      <Button type="primary" onClick={showModal}>
      Ajouter Activité support 
      </Button>
      <Modal
        title="Ajouter Activité support "
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <form>
          <div className="form-group mb-2">
            <label className="form-label">Nombre des tickets :</label>
            <input
              type="text"
              placeholder="Entrer le nombre des tickets support"
              name="ticketCount"
              value={ticketCount}
              onChange={(e) => setTicketCount(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          <div className="form-group mb-2">
            <label className="form-label">Effort mobilisé :</label>
            <input
              type="text"
              placeholder="Entrer l'effort mobilisé "
              name="effortSpent"
              value={effortSpent}
              onChange={(e) => setEffortSpent(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          <div className="form-group mb-2">
            <label className="form-label">Top 3 des sujets en support N3 :</label>
            <input
              type="text"
              placeholder="Entrer les sujets séparés par des virgules (,)"
              name="topSubjects"
              value={topSubjects}
              onChange={(e) => setTopSubjects(e.target.value)}
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

export default AddSupport