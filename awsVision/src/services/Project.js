import axios from "axios";


export const listSquads = (domainId) => axios.get('http://localhost:8765/api/squads/domain' + '/' + domainId);
export const addProject = (project) => axios.post('http://localhost:8765/api/projects',project);
export const DetailProject = (idProject) => axios.get('http://localhost:8765/api/projects' + '/' + idProject);
export const listProjects = (domainId) => axios.get('http://localhost:8765/api/projects/domain' + '/' + domainId);
export const addKPI = (kpi, projectId) => axios.post('http://localhost:8765/api/projects' + '/' + projectId + '/kpis', kpi);
export const addRemarkOrRisk = (remarkOrRisk,  projectId) => axios.post('http://localhost:8765/api/projects' + '/' + projectId + '/remarks', remarkOrRisk);
export const addMilestone = (milestone, projectId) => axios.post('http://localhost:8765/api/projects' + '/' + projectId + '/milestones', milestone);
export const addRealization = (realization, projectId) => axios.post('http://localhost:8765/api/projects' + '/' + projectId + '/upcomingRealizations', realization);

// Phase
export const updatePhase = (updatedPhase, projectId) => axios.patch('http://localhost:8765/api/projects' + '/' + projectId + '/phase', updatedPhase);



