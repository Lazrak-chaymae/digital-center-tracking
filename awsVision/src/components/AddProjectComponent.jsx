import React, { useEffect, useState } from 'react'
import { addProject, listSquads } from '../services/Project';

const AddProjectComponent = () => {
    const status = "EnConstruction";
    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [startDate, setStartDate] = useState('');
    const [expectedEndDate, setExpectedEndDate] = useState('');
    const [type, setType] = useState('');
    const [budget, setBudget] = useState('');
    const [description, setDescription] = useState('');
    const [allSquads, setAllSquads] = useState([]);
    const [squad, setSquad] = useState({ id: '', name: '' });


    const getSquads = () => {
        listSquads().then(
            (response) => {
                setAllSquads(response.data);
            }
        )
            .catch(
                error => {
                    console.error(error);
                }
            )
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const projectData = {
            name,
            owner,
            startDate,
            expectedEndDate,
            type,
            budget,
            description,
            squad,
            status
        };
        addProject(projectData)
      .then((response) => {
        console.log("Project added successfully:", response.data);
        resetForm();
      })
      .catch((error) => {
        console.error("There was an error adding the project:", error);
      });
    };
    const resetForm = () => {
        setName('');
        setOwner('');
        setStartDate('');
        setExpectedEndDate('');
        setType('');
        setBudget('');
        setDescription('');
        setSquad({ id: '', name: '' });
    }
    const handleSquadChange = (e) => {
        const selectedSquad = allSquads.find(s => s.id === parseInt(e.target.value));
        if (selectedSquad) {
            setSquad({ id: selectedSquad.id, name: selectedSquad.name });
        }
    };

    useEffect(() => {
        getSquads();
    }, [])
    return (

        <div className='center-container' style={{ paddingTop: '12px' }}>
            <div className="forms">
                <form>

                    <div className="form-group mb-2">
                        <label className='form-label'>Nom :</label>
                        <input type='text' placeholder='Entrer le nom du projet'
                            name='name' value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`form-control`}
                        ></input>

                    </div>
                    <div className="form-group mb-2">
                        <label className='form-label'>Owner :</label>
                        <input type='text' placeholder='Entrer le nom du owner'
                            name='owner' value={owner}
                            onChange={(e) => setOwner(e.target.value)}
                            className={`form-control`}
                        ></input>

                    </div>
                    <div className="form-group mb-2">
                        <label className='form-label'>Date début:</label>
                        <input type='text' placeholder='Entrer la date debut du projet'
                            name='startDate' value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className={`form-control`}
                        ></input>

                    </div>
                    <div className="form-group mb-2">
                        <label className='form-label'>Date fin prevue:</label>
                        <input type='text' placeholder='Entrer la date de fin prevue du projet'
                            name='expectedEndDate' value={expectedEndDate}
                            onChange={(e) => setExpectedEndDate(e.target.value)}
                            className={`form-control`}
                        ></input>

                    </div>
                    <div className="form-group mb-2">
                        <label className='form-label'>Type:</label>
                        <input type='text' placeholder='Entrer le type du projet'
                            name='type' value={type}
                            onChange={(e) => setType(e.target.value)}
                            className={`form-control`}
                        ></input>

                    </div>
                    <div className="form-group mb-2">
                        <label className='form-label'>Budget:</label>
                        <input type='text' placeholder='Entrer le budget du projet'
                            name='budget' value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            className={`form-control`}
                        ></input>

                    </div>
                    <div className="form-group mb-2">
                        <label className='form-label'>Description:</label>
                        <input type='text' placeholder='Entrer la description du projet'
                            name='description' value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={`form-control`}
                        ></input>

                    </div>
                    <div className="form-group mb-2">
                        <label className='form-label'>Squad:</label>
                        <select name='squad' className={`form-control`}
                            onChange={handleSquadChange}
                            value={squad.id}
                            >
                            <option value="">Sélectionner une squad</option>
                            {allSquads.map((squad) => (
                                <option key={squad.id} value={squad.id}>{squad.name}</option>
                            ))}

                        </select>

                    </div>
                    <button className='btn btn-success' onClick={(e) => handleSubmit(e)}>Submit</button>
                </form>

            </div>
        </div>

    )
}

export default AddProjectComponent