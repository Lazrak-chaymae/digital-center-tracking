import React, { useEffect, useState } from 'react'
import ProjectCard from './ProjectCard'
import { listProjects } from '../services/Project'
import TinyCompo from './TinyCompo'


const HomeComponent = () => {
  const [projects,setProjects] = useState([]);
  const domainId = sessionStorage.getItem("domainId");
 

  const getAllProjects = () =>
  {
       listProjects(domainId).then(
         (response) =>
         {
            setProjects(response.data);
         }).catch(
          error =>
         {
           console.error(error);
         }
       )
  }

 
useEffect(() => {
  getAllProjects();
  
}, [])

  return (
    <div className='container' style={{ paddingTop: '12px' }}>
      <h3 className='text-center'>Projets</h3>
      <div className='row'>
        {projects.map((project, index) => (
          <div className='col-3' key={index}>
            <ProjectCard {...project} refreshProject={getAllProjects} />
          </div>
        ))}
      </div>
       <h4>Tiny</h4>
      <div>
        <TinyCompo />
      </div>
    </div>
   
  )
}

export default HomeComponent