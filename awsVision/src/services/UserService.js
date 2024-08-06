import axios from "axios";

const AUTH_REST_API_URL = 'http://localhost:8765/api/auth/change-password';

export const updatePassword = (updateRequest) => axios.patch(AUTH_REST_API_URL, updateRequest);