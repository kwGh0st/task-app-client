import apiClient from "./ApiClient";

export const retrieveAllTodosForUsernameApi = (username) =>
  apiClient.get(`/user/todo/${username}/todos`);

export const retrieveTodoApi = (username, id) =>
  apiClient.get(`/user/todo/${username}/todos/${id}`);

export const deleteTodoApi = (username, id) =>
  apiClient.delete(`/user/todo/${username}/todos/${id}`);

export const updateTodoApi = (username, id, todo) =>
  apiClient.put(`/user/todo/${username}/todos/${id}`, todo);

export const createTodoApi = (username, todo) =>
  apiClient.post(`/user/todo/${username}/todos`, todo);

export const executeUpdateTodosNotification = async (
  username,
  notifications
) => {
  return await apiClient.post(`/user/todo/${username}/${notifications}`);
};
