import apiClient from "./ApiClient";

export const executeUserFetchData = async (username) => {
  const response = await apiClient.get(`/user/fetch-data/${username}`);
  return response;
};

export const executeChangeEmail = async ({ username, email, password }) => {
  const response = await apiClient.post(`/user/change-email`, {
    username,
    email,
    password,
  });
  return response;
};

export const executeChangePassword = async ({
  email,
  password,
  newPassword,
}) => {
  const response = await apiClient.post("/user/change-password", {
    email,
    password,
    newPassword,
  });
  return response;
};

export const executeDeleteAccount = async ({ username, password }) => {
  const response = await apiClient.post("/user/delete-account", {
    username,
    password,
  });
  return response;
};

export const executeUpdateCredentials = async (
  updateCredentialsToken,
  { username, password }
) => {
  return await apiClient.post(
    `/login/update-credentials-by-token/${updateCredentialsToken}`,
    {
      username,
      password,
    }
  );
};
