import axios from "axios";


export const listEtapes = (domainId) => axios.get('http://localhost:8765/api/etapes/domain' + '/' + domainId);
export const addEtape = (etape) => axios.post('http://localhost:8765/api/etapes', etape);

export const updateEtape = (etapeId, name) => axios.patch('http://localhost:8765/api/etapes' + '/' + etapeId, name,{
    headers: {
      "Content-Type": "text/plain",
    },
  }); 

  export const deleteEtape = (etapeId) => axios.delete('http://localhost:8765/api/etapes' + '/' + etapeId);