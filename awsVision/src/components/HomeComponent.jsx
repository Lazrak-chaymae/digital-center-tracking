import React from 'react'
import ProjectCard from './ProjectCard'



const HomeComponent = () => {

  const projects = [
    { title: 'Projet 1', status: 'Statut', phase: 'Phase', squad: 'Squad', date: 'Date', detailsLink: '/project' },
    { title: 'Projet 2', status: 'Statut', phase: 'Phase', squad: 'Squad', date: 'Date', detailsLink: '/project' },
    { title: 'Projet 3', status: 'Statut', phase: 'Phase', squad: 'Squad', date: 'Date', detailsLink: '/project' },
    { title: 'Projet 4', status: 'Statut', phase: 'Phase', squad: 'Squad', date: 'Date', detailsLink: '/project' },
  ];
  return (
    <div className='container' style={{ paddingTop: '12px' }}>
      <h3 className='text-center'>Projets</h3>
      <div className='row'>
        {projects.map((project, index) => (
          <div className='col-3' key={index}>
            <ProjectCard {...project} />
          </div>
        ))}
      </div>

    </div>
  )
}

export default HomeComponent