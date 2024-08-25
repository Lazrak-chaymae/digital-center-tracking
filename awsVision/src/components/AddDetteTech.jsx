import React,{useEffect, useState} from 'react';
import { Button, Modal } from "antd";
import { addDebt } from '../services/DetteTechnique';

const AddDetteTech = ({refreshDebts, domainId}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [impact, setImpact] = useState('');
  const [cost, setCost] = useState('');
  const [voluntary, setVoluntary] = useState('');
  const [comments, setComments] = useState('');
  const [validForm, setValidForm] = useState(true);
  
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const debtData = {
      domainId,
      title,
      type,
      impact,
      cost,
      voluntary,
      comments,
    };
    if(!title || !type || !impact || !cost || !voluntary || !comments ){
       setValidForm(false);
       return ;
    }
    try {
      const response = await addDebt(debtData);
      console.log("Debt added successfully:", response.data);
      refreshDebts();
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error("There was an error adding the debt:", error);
    }
  };
  const resetForm = () => {    
    setTitle(''); 
    setType(''); 
    setImpact(''); 
    setCost(''); 
    setVoluntary('');  
    setComments(''); 
  }
  useEffect(() => {
    if(title && type && impact && cost && voluntary && comments ){
      setValidForm(true);
      return ;
   }
  } , [title,
    type,
    impact,
    cost,
    voluntary,
    comments])
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Ajouter une Dette Technique
      </Button>
      <Modal
        className="text-center"
        title="Ajouter une Dette Technique"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <form>
          <div className="form-group mb-2">
            <label className="form-label">Titre :</label>
            <input
              type="text"
              placeholder="Entrer le titre du dette "
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          <div className="form-group mb-2">
            <label className="form-label">Type :</label>
            <input
              type="text"
              placeholder="Entrer le type du dette"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          <div className="form-group mb-2">
            <label className="form-label">Impact sur le logiciel:</label>
            <input
              type="text"
              placeholder="Entrer l'impact (S/M/L)"
              name="impact"
              value={impact}
              onChange={(e) => setImpact(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          <div className="form-group mb-2">
            <label className="form-label">Coût de correction:</label>
            <input
              type="text"
              placeholder="Entrer le Coût (S/M/L) "
              name="cost"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          <div className="form-group mb-2">
            <label className="form-label">Volentaire / Involentaire :</label>
            <input
              type="text"
              placeholder="Entrer Volentaire ou Involentaire"
              name="voluntary"
              value={voluntary}
              onChange={(e) => setVoluntary(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          <div className="form-group mb-2">
            <label className="form-label">Commentaire :</label>
            <input
              type="text"
              placeholder="Entrer des commentaires "
              name="comment"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          {!validForm && 
            <div className='error-message'> 
                ** Veuillez remplir toutes les cases **
            </div>
          }
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

export default AddDetteTech