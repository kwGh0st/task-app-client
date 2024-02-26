import apiClient from "./ApiClient";

export const executeUserRegister = async ({ username, email, password }) => {
  const response = await apiClient.post("/register", {
    username,
    email,
    password,
  });
  return response;
};

export const executeResendVerificationToken = async (email) => {
  const response = await apiClient.post(
    "/register/resend-registration-token",
    null,
    { params: { email } }
  );
  return response;
};
