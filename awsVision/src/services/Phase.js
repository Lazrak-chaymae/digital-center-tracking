import axios from "axios";

export const getAllPhases = (domainId) => axios.get('http://localhost:8765/api/phases/domain' + '/' + domainId);
export const addPhases = (phase) => axios.post('http://localhost:8765/api/phases', phase);