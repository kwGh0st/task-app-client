import apiClient from "./ApiClient";

export const executeGetResetPasswordEmail = async (email) => {
  const response = await apiClient.post("/login/reset-password", null, {
    params: { email },
  });

  return response;
};

export const executeResetPassword = async ({
  password,
  confirmPassword,
  passwordToken,
}) => {
  const response = await apiClient.post("/login/save-new-password", {
    password,
    confirmPassword,
    passwordToken,
  });
  return response;
};
