import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8765/api/business-kpis';


export const listKPIs = (type, domainId) => axios.get(REST_API_BASE_URL + '/domain/' + domainId + '/type/' + type);
export const addKPI = (kpi) => axios.post(REST_API_BASE_URL, kpi);
export const deleteKPI = (kpiId) => axios.delete(REST_API_BASE_URL + '/' + kpiId);

export const updateFunctionality = (kpiId, functionality) => axios.patch(REST_API_BASE_URL + '/' + kpiId + '/functionality', functionality,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    });
export const updateIndicator = (kpiId, indicator) => axios.patch(REST_API_BASE_URL + '/' + kpiId + '/indicator', indicator,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    });
export const updatePlanned = (kpiId, planned) => axios.patch(REST_API_BASE_URL + '/' + kpiId + '/planned', planned,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    });
export const updateAchieved = (kpiId, achieved) => axios.patch(REST_API_BASE_URL + '/' + kpiId + '/achieved', achieved,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    });
export const updatePreviousMeasure = (kpiId, previousMeasure) => axios.patch(REST_API_BASE_URL + '/' + kpiId + '/previous-measure', previousMeasure,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    });



