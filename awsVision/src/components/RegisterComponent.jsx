import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { registerAPICall, listRoles } from '../services/AuthService'


const RegisterComponent = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordMatch, setPasswordMatch] = useState(true)
    const [roleName, setRoleName] = useState('')
    const [roles, setRoles] = useState([])
    const [valideRegister, setValideRegister] = useState(true);

    const navigate = useNavigate()
    
    const getRoles = () => {
        listRoles().then(
            (response) => {
                setRoles(response.data);
            }
        )
            .catch(
                error => {
                    console.error(error);
                }
            )
    }
    function handleRegistrationForm(e) {
        e.preventDefault();
        if (!name || !email || !password || !confirmPassword || !roleName) {
            setValideRegister(false);
            return;
        }
        const register = { name, email, password, roleName };
        registerAPICall(register).then(
            (response) => { 
                console.log(register);
                console.log(response.data);
                navigate('/login');
             }
            
        ).catch(
            
            error => { console.error(error)
                console.log(register)
             }
        )
    }
    useEffect(() => {
        if (password && confirmPassword) {
            setPasswordMatch(password === confirmPassword);
        }
    }, [password, confirmPassword]);
    useEffect(() => {
        getRoles();
    }, [])
  return (
    <div className='container'>
            <br />
            <div className='row'>
                <div className='col-md-6 offset-md-3 offset-md-3'>
                    <div className='card'>
                        <div className='card-header'>
                            <h2 className='text-center'>Inscription</h2>
                        </div>
                        <div className='card-body'>
                            <form>
                                <div className='row mb-3'>
                                    <label className='col-md-3 control-label'>Nom</label>
                                    <div className='col-md-9'>
                                        <input className='form-control'
                                            type='text'
                                            name='name'
                                            placeholder='Entrer votre nom'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)} required/>
                                    </div>
                                </div>

                                <div className='row mb-3'>
                                    <label className='col-md-3 control-label'>Email</label>
                                    <div className='col-md-9'>
                                        <input className='form-control'
                                            type='email'
                                            name='email'
                                            placeholder='Entrer votre email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)} required/>
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <label className='col-md-3 control-label'>Mot de passe</label>
                                    <div className='col-md-9'>
                                        <input className='form-control'
                                            type='password'
                                            name='password'
                                            placeholder='Entrer votre mot de passe'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} required />
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <label className='col-md-3 control-label'>Confirmer Mot de passe</label>
                                    <div className='col-md-9'>
                                        <input className='form-control'
                                            type='password'
                                            name='confirmPassword'
                                            placeholder='Confirmer votre mot de passe'
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)} required />
                                             {!passwordMatch && (
                                            <small className="text-danger">Les mots de passe ne correspondent pas</small>
                                        )}
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <label className='col-md-3 control-label'>Poste</label>
                                    <div className='col-md-9'>
                                        <select name='role' className='form-control'
                                            value={roleName}
                                            onChange={(e) => setRoleName(e.target.value)} required>
                                            <option value="">Sélectionner votre poste</option>
                                            {roles.map((role) => (
                                                <option key={role.id} >{role.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='form-group mb-3'>
                                {!valideRegister && (
                                            <small className="text-danger"> ** Veuillez remplir tous les champs requis.</small>
                                        )}
                                </div>
                                <div className='form-group mb-3'>
                                    <button className='btn btn-primary' onClick={(e) => handleRegistrationForm(e)}>Submit</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default RegisterComponent