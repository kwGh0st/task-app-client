import apiClient from "./ApiClient";

export const executeGetAllUsers = async () => {
  return await apiClient.get("/admin-panel/get-all-users");
};

export const executeGetUserById = async (id) => {
  return await apiClient.get(`/admin-panel/get-user/${id}`);
};

export const executeBlockUser = async (id) => {
  return await apiClient.put(`/admin-panel/block-user/${id}`);
};
export const executeUnblockUser = async (id) => {
  return await apiClient.put(`/admin-panel/unlock-user/${id}`);
};

export const executeChangeUserRole = async (
  userId,
  { newRole, adminPassword, adminId }
) => {
  return await apiClient.put(`/admin-panel/change-role/${userId}`, {
    newRole,
    adminPassword,
    adminId,
  });
};

export const executeDeleteUser = async (userId, { adminPassword, adminId }) => {
  return await apiClient.delete(`/admin-panel/delete-user/${userId}`, {
    data: {
      adminPassword: adminPassword,
      adminId: adminId,
    },
  });
};

export const executeCreateNewUser = async ({
  email,
  role,
  adminId,
  adminPassword,
}) => {
  return await apiClient.post("/admin-panel/create-new-user", {
    email,
    role,
    adminId,
    adminPassword,
  });
};
