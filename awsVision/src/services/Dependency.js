import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8765/api/dependencies';

export const listDependencies = () => axios.get(REST_API_BASE_URL);
export const addDependency = (dependency) => axios.post(REST_API_BASE_URL, dependency);

