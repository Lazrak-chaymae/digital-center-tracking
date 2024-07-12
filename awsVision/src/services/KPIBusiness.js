import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8765/api/business-kpis';

export const listKPIs = (type) => axios.get(REST_API_BASE_URL + '/' + type);