import axios from "axios";


export const listEtapes = (domainId) => axios.get('http://localhost:8765/api/etapes/domain' + '/' + domainId);
export const addEtape = (etape) => axios.post('http://localhost:8765/api/etapes', etape);