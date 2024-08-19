import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8765/api/supports";

export const supportItem = (domainId) =>
  axios.get(REST_API_BASE_URL + "/domain/" + domainId);
export const addSupport = (support) => axios.post(REST_API_BASE_URL, support);

export const updateTicketCount = (supportId, ticketCount) =>
  axios.patch(
    REST_API_BASE_URL + "/" + supportId + "/ticket-count",
    ticketCount,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
export const updateEffortSpent = (supportId, effortSpent) =>
  axios.patch(
    REST_API_BASE_URL + "/" + supportId + "/effort-spent",
    effortSpent,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
export const updateTopSubjects = (supportId, index, subject) =>
  axios.patch(
    REST_API_BASE_URL + "/" + supportId + "/subject/" + index,
    subject,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
