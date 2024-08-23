import axios from "axios";

const AUTH_REST_API_URL = 'http://localhost:8765/api/auth/change-password';
const LIST_USERS_REST_API_URL = 'http://localhost:8765/api/auth//users/domain'

export const updatePassword = (updateRequest) => axios.patch(AUTH_REST_API_URL, updateRequest);
export const listUsersByDomain = (domainId) => axios.get(LIST_USERS_REST_API_URL + '/' + domainId);