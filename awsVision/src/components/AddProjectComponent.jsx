import React from 'react'

const AddProjectComponent = () => {
  return (
    <>
    <div className="card-body">
                        <form>
                        
                            <div className="form-group mb-2">
                                <label className='form-label'>Nom :</label>
                                <input type='text' placeholder='Entrer le nom du projet'
                                    name='name' value='name'
                                    className={`form-control`} 
                                ></input>
                               
                            </div>
                            <div className="form-group mb-2">
                                <label className='form-label'>Date debut:</label>
                                <input type='text' placeholder='Entrer la date debut du projet'
                                    name='date' value='date'
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