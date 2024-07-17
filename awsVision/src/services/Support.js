import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8765/api/supports';

export const listSupport = () => axios.get(REST_API_BASE_URL) ;