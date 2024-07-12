import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8765/api/status/En construction/squad';

export const listProjects = (squadId) => axios.get(REST_API_BASE_URL + '/' + squadId);
export const listSquads = () => axios.get('http://localhost:8765/api/squads');