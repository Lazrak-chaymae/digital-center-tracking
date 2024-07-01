import React from 'react'

const AddProjectComponent = () => {
  return (
    <>
    <div className="card-body">
                        <form>
                        
                            <div className="form-group mb-2">
                                <label className='form-label'>Last Name:</label>
                                <input type='text' placeholder='Enter Employee Last Name'
                                    name='lastName' value='lastName'
                                    className={`form-control`} 
                                ></input>
                               
                            </div>
                            <div className="form-group mb-2">
                                <label className='form-label'>Email:</label>
                                <input type='text' placeholder='Enter Employee Email'
                                    name='email' value='email'
                                    className={`form-control`}
                                ></input>
                               
                            </div>
                            
                            <button className='btn btn-success' >Submit</button>
                        </form>

                    </div>
    </>
  )
}

export default AddProjectComponent