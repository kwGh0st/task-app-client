import apiClient from "./ApiClient";

export const executeJwtAuthenticateService = async (username, password) => {
  const response = await apiClient.post(`/authenticate`, {
    username,
    password,
  });
  return response;
};
