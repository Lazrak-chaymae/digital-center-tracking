import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8765/api/business-kpis';


export const listKPIs = (type, domainId) => axios.get(REST_API_BASE_URL + '/domain/' + domainId + '/type/' + type);
export const addKPI = (kpi) => axios.post(REST_API_BASE_URL, kpi);
export const deleteKPI = (kpiId) => axios.delete(REST_API_BASE_URL + '/' + kpiId);
