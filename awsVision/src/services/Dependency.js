import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8765/api/dependencies";

export const listDependencies = (domainId) =>
  axios.get(REST_API_BASE_URL + "/domain/" + domainId);
export const addDependency = (dependency) =>
  axios.post(REST_API_BASE_URL, dependency);
export const deleteDependency = (dependencyId) =>
  axios.delete(REST_API_BASE_URL + "/" + dependencyId);

export const updateTitle = (dependencyId, title) =>
  axios.patch(REST_API_BASE_URL + "/" + dependencyId + "/title", title, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
export const updatePriority = (dependencyId, priority) =>
  axios.patch(REST_API_BASE_URL + "/" + dependencyId + "/priority", priority, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
export const updateResponsibleTeam = (dependencyId, responsibleTeam) =>
  axios.patch(
    REST_API_BASE_URL + "/" + dependencyId + "/responsible-team",
    responsibleTeam
  );
export const updateBeneficiaryTeam = (dependencyId, beneficiaryTeam) =>
  axios.patch(
    REST_API_BASE_URL + "/" + dependencyId + "/beneficiary-team",
    beneficiaryTeam
  );
export const updateScheduledDate = (dependencyId, scheduledDate) =>
  axios.patch(
    REST_API_BASE_URL + "/" + dependencyId + "/scheduled-date",
    scheduledDate
  );
