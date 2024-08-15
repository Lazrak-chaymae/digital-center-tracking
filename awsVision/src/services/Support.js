import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8765/api/supports';

export const supportItem = (domainId) => axios.get(REST_API_BASE_URL + '/domain/' + domainId) ;
export const addSupport = (support) => axios.post(REST_API_BASE_URL, support);