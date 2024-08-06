import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8765/api/technical-debts';

export const listdebts = () => axios.get(REST_API_BASE_URL) ;
export const addDebt = (debt) => axios.post(REST_API_BASE_URL, debt);