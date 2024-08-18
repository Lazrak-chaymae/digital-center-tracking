import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8765/api/business-kpis';


export const listKPIs = (type, domainId) => axios.get(REST_API_BASE_URL + '/domain/' + domainId + '/type/' + type);
export const addKPI = (kpi) => axios.post(REST_API_BASE_URL, kpi);
export const deleteKPI = (kpiId) => axios.delete(REST_API_BASE_URL + '/' + kpiId);

export const updateFunctionality = (kpiId, functionality) => axios.patch(REST_API_BASE_URL + '/' + kpiId + '/functionality', functionality);
export const updateIndicator = (kpiId, indicator) => axios.patch(REST_API_BASE_URL + '/' + kpiId + '/indicator', indicator);
export const updatePlanned = (kpiId, planned) => axios.patch(REST_API_BASE_URL + '/' + kpiId + '/planned', planned);
export const updateAchieved = (kpiId, achieved) => axios.patch(REST_API_BASE_URL + '/' + kpiId + '/achieved', achieved);
export const updatePreviousMeasure = (kpiId, previousMeasure) => axios.patch(REST_API_BASE_URL + '/' + kpiId + '/previous-measure', previousMeasure);



