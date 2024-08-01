import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginAPICall, saveLoggedInUser, storeToken } from '../services/AuthService'

const LoginComponent = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function handleLoginForm(e) {
        e.preventDefault()
        await loginAPICall(email, password).then(
            (response) => {
                console.log(response.data);
                //const token = 'Basic ' + window.btoa(email + ":" + password);
                const token = 'Bearer ' + response.data.accessToken;
                const role = response.data.role;
                storeToken(token);
                saveLoggedInUser(email, role);
                navigate('/home')

                window.location.reload(false);
            }

        ).catch(
            error => { console.error(error) }
        )
    }
  return (
    <div className='container'>
    <br />

    <div className='row'>
        <div className='col-md-6 offset-md-3'>
            <div className='card'>
                <div className='card-header'>
                    <h2 className='text-center'>Login Form</h2>
                </div>
                <div className='card-body'>
                    <form>
                        <div className='row mb-3'>
                            <label className='col-md-3 control-label'>Email</label>
                            <div className='col-md-9'>
                                <input className='form-control'
                                    type='text'
                                    name='email'
                                    placeholder='Enter email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}></input>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label className='col-md-3 control-label'>Password</label>
                            <div className='col-md-9'>
                                <input className='form-control'
                                    type='password'
                                    name='password'
                                    placeholder='Enter password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}></input>
                            </div>
                        </div>
                        <button className='btn btn-primary' onClick={(e) => handleLoginForm(e)}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

</div>
  )
}

export default LoginComponent