import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8765/api/technical-debts';

export const listdebts = (domainId) => axios.get(REST_API_BASE_URL + '/domain/' + domainId) ;
export const addDebt = (debt) => axios.post(REST_API_BASE_URL, debt);
export const deleteDebt = (debtId) => axios.delete(REST_API_BASE_URL + '/' + debtId);