import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8765/api/dependencies';

export const listDependencies = (domainId) => axios.get(REST_API_BASE_URL + '/domain/' + domainId);
export const addDependency = (dependency) => axios.post(REST_API_BASE_URL, dependency);
export const deleteDependency = (dependencyId) => axios.delete(REST_API_BASE_URL + '/' + dependencyId);


