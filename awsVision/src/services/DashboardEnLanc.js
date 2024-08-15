import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8765/api/projects/in-launch/status/EnLancement/squad';

export const listProjects = (squadId) => axios.get(REST_API_BASE_URL + '/' + squadId);
