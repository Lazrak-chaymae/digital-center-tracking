import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8765/api/releases';

export const listReleases = (domainId) => axios.get(REST_API_BASE_URL + '/domain/' + domainId) ;
export const addRelease = (release) => axios.post(REST_API_BASE_URL,release);
export const deleteRelease = (releaseId) => axios.delete(REST_API_BASE_URL + '/' + releaseId);