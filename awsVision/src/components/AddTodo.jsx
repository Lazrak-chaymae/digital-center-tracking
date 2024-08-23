import React, { useState, useEffect} from 'react'
import { addTodo } from '../services/Todo';
import { listProjects } from '../services/Project';
import { listUsersByDomain } from '../services/UserService';
import { Button, Modal } from "antd";

const AddTodo = ({refreshTodo, domain, defaultProject}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [detail, setDetail] = useState("");
    const [deadline, setDeadline] = useState("");
    const [status, setStatus] = useState("");
    const [listProject, setListProject] = useState([]);
    const [listUser, setListUser] = useState([]);
    const [selectedProject, setSelectedProject] = useState("");
    const domainId = domain;
    const [user, setUser] = useState("");
    const [userName, setUserName] = useState("");
    const [responsible, setResponsible] = useState("");
    const [validForm, setValidForm] = useState(true);
    
    
    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (
        !name ||
        !detail ||
        !deadline ||
        !status 
      ) {
        setValidForm(false);
        return;
      }
    
      const todoData = {
        name,
        detail,
        deadline,
        status,
        projectId: defaultProject || selectedProject,
        domainId,
        userName : user,
        responsible
      };
        
      try {
        const response = await addTodo(todoData);
        console.log("Task added successfully:", response.data);
        refreshTodo();
        resetForm();
        setIsModalOpen(false);
      } catch (error) {
        console.error("There was an error adding task:", error);
        console.log("todo",todoData);
      }
    };
    const resetForm = () =>  {
         setName('');
         setDetail('');
         setDeadline('');
         setStatus('');
         setUser('');
         setSelectedProject('');
         setUserName('');
         setResponsible('');
    }
    const getProjects = () => {
        listProjects(domainId).then(
            (response) =>
            {
               setListProject(response.data);
               console.log("projects" ,response.data);
            }).catch(
             error =>
            {
              console.error(error);
            }
          )
    }
    const getUsers = () => {
        listUsersByDomain(domainId).then(
            (response) =>
            {
               setListUser(response.data);
               console.log("userss" ,response.data)
            }).catch(
             error =>
            {
              console.error(error);
            }
          )
    }
   
    useEffect(() => {
      if (
        name &&
        detail &&
        deadline &&
        status 
      ) {
        setValidForm(true);
        return;
      }
    }, [name ,
        detail ,
        deadline ,
        status ]);
        
        useEffect(() => {
             getProjects();
             getUsers();
          }, []);
          
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Ajouter une tâche
      </Button>
      <Modal
        className="text-center"
        title="tâche"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <form>
          
          <div className="form-group mb-2">
            <label className="form-label">Nom :</label>
            <input
              type="text"
              placeholder="Entrer le nom du tâche"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          <div className="form-group mb-2">
            <label className="form-label">Détail:</label>
            <input
              type="text"
              placeholder="Entrer le détail du tâche"
              name="detail"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          <div className="form-group mb-2">
            <label className="form-label">Deadline :</label>
            <input
              type="date"
              name="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          <div className="form-group mb-2">
            <label className="form-label">Statut:</label>
            <input
              type="text"
              placeholder="Entrer le statut du tache tâche"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          {!defaultProject &&
          <div className="form-group mb-2">
            <label className="form-label">Assigné à un projet :</label>
            <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className={`form-control`}
            >
                <option value="" disabled>Séléctioner un projet</option>
                {listProject && listProject.map((project) => (
                     <option key={project.id} value={project.id}>{project.name}</option>
                ))}
            </select>
          </div>
}
          <div className="form-group mb-2">
            <label className="form-label">Porteur :</label>
            <select
            value={user}
            onChange={(e) => { 
                setUser(e.target.value);
            }}
            className={`form-control`}
            >
                <option value="" disabled>Séléctioner un utilisateur</option>
                {listUser && listUser.map((user) => (
                     <option key={user.id} value={user.name}>{user.name}</option>
                ))}
                
            </select>
          </div>
          <div className="form-group mb-2">
            <label className="form-label">Responsable :</label>
            <input
              type="text"
              placeholder="Entrer le nom d"
              name="responsible"
              value={responsible}
              onChange={(e) => setResponsible(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          {!validForm && (
            <div className="error-message">
              ** Veuillez remplir toutes les cases requises**
            </div>
          )}
          <div className="button-container">
            <button
              className="btn btn-primary"
              onClick={(e) => handleSubmit(e)}
            >
              Ajouter
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default AddTodo