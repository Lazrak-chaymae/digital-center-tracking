import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8765/api/releases';

export const listReleases = () => axios.get(REST_API_BASE_URL) ;