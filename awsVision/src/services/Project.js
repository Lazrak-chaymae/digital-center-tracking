import axios from "axios";


export const listSquads = () => axios.get('http://localhost:8765/api/squads');
export const addProject = (project) => axios.post('http://localhost:8765/api/projects',project);
export const DetailProject = (idProject) => axios.get('http://localhost:8765/api/projects' + '/' + idProject);
export const listProjects = () => axios.get('http://localhost:8765/api/projects');
export const addKPI = (kpi, projectId) => axios.post('http://localhost:8765/api/projects' + '/' + projectId + '/kpis', kpi);
export const addRemarkOrRisk = (remarkOrRisk,  projectId) => axios.post('http://localhost:8765/api/projects' + '/' + projectId + '/remarks', remarkOrRisk);
export const addMilestone = (milestone, projectId) => axios.post('http://localhost:8765/api/projects' + '/' + projectId + '/milestones', milestone);
export const addRealization = (realization, projectId) => axios.post('http://localhost:8765/api/projects' + '/' + projectId + '/upcomingRealizations', realization);
export const updatePhase = (updatedPhase, projectId) => axios.patch('http://localhost:8765/api/projects' + '/' + projectId + '/phase', updatedPhase);
export const getAllPhases = () => axios.get('http://localhost:8765/api/projects/phases');
export const addPhases = (phase) => axios.post('http://localhost:8765/api/projects/phases', phase);