import axios from "axios";

export const listSquads = () => axios.get('http://localhost:8765/api/squads');
export const addProject = (project) => axios.post('http://localhost:8765/api/projects',project);
export const DetailProject = (idProject) => axios.get('http://localhost:8765/api/projects' + '/' + idProject);
export const listProjects = () => axios.get('http://localhost:8765/api/projects');
