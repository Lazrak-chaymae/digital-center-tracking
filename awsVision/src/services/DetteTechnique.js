import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8765/api/technical-debts";

export const listdebts = (domainId) =>
  axios.get(REST_API_BASE_URL + "/domain/" + domainId);
export const addDebt = (debt) => axios.post(REST_API_BASE_URL, debt);
export const deleteDebt = (debtId) =>
  axios.delete(REST_API_BASE_URL + "/" + debtId);

export const updateTitle = (supportId, title) =>
  axios.patch(REST_API_BASE_URL + "/" + supportId + "/title", title, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
export const updateType = (supportId, type) =>
  axios.patch(REST_API_BASE_URL + "/" + supportId + "/type", type, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
export const updateImpact = (supportId, impact) =>
  axios.patch(REST_API_BASE_URL + "/" + supportId + "/impact", impact, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
export const updateCost = (supportId, cost) =>
  axios.patch(REST_API_BASE_URL + "/" + supportId + "/cost", cost, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
export const updateVoluntary = (supportId, voluntary) =>
  axios.patch(REST_API_BASE_URL + "/" + supportId + "/voluntary", voluntary, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
export const updateComments = (supportId, comment) =>
  axios.patch(
    REST_API_BASE_URL + "/" + supportId + "/comments",
    comment,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
