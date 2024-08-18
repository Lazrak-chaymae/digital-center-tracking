import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8765/api/releases';

export const listReleases = (domainId) => axios.get(REST_API_BASE_URL + '/domain/' + domainId) ;
export const addRelease = (release) => axios.post(REST_API_BASE_URL,release);
export const deleteRelease = (releaseId) => axios.delete(REST_API_BASE_URL + '/' + releaseId);

export const updateInstallationDate = (releaseId, installationDate) => axios.patch(REST_API_BASE_URL + '/' + releaseId + '/installation-date', installationDate);
export const updateVersion = (releaseId, version) => axios.patch(REST_API_BASE_URL + '/' + releaseId + '/version', version);
export const updateType = (releaseId, type) => axios.patch(REST_API_BASE_URL + '/' + releaseId + '/type' , type);
export const updatePackages = (releaseId, index, packages) => axios.patch(REST_API_BASE_URL + '/' + releaseId + '/packages/' + index, packages);
export const updateHotfixContents = (releaseId, index, hotfixContents) => axios.patch(REST_API_BASE_URL + '/' + releaseId + '/hotfix-contents/' + index, hotfixContents);
export const updateEvolution = (releaseId, evolution) => axios.patch(REST_API_BASE_URL + '/' + releaseId + '/evolution', evolution);
