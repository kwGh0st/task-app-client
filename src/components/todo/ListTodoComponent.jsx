import React, { useState, useEffect, useCallback } from "react";
import classnames from "classnames";
import {
  retrieveAllTodosForUsernameApi,
  deleteTodoApi,
  updateTodoApi,
} from "../../api/TodoApiService";
import { useAuth } from "../../security/AuthContext";
import { useNavigate } from "react-router-dom";

const ListTodoComponent = () => {
  const [todos, setTodos] = useState([]);
  const [selectedDoneTodos, setSelectedDoneTodos] = useState([]);

  const authContext = useAuth();
  const username = authContext.username;
  const navigate = useNavigate();

  const refreshTodos = useCallback(() => {
    retrieveAllTodosForUsernameApi(username)
      .then((response) => {
        setTodos(response.data);

        const selectedDoneIndexes = response.data
          .map((todo, index) => (todo.done ? index : -1))
          .filter((index) => index !== -1);

        setSelectedDoneTodos(selectedDoneIndexes);
      })
      .catch((error) => console.log(error));
  }, [username]);

  useEffect(() => refreshTodos(), [refreshTodos]);

  const isOverdue = (targetDate) => {
    const today = new Date();
    const target = new Date(targetDate);
    return target < today;
  };

  const isToday = (targetDate) => {
    const today = new Date();
    const target = new Date(targetDate);
    return (
      target.getDate() === today.getDate() &&
      target.getMonth() === today.getMonth() &&
      target.getFullYear() === today.getFullYear()
    );
  };

  function handleUpdateTodo(id) {
    navigate(`/user/todo/${id}`);
  }

  function handleDoneTodoUpdate(todo, index) {
    return () => {
      todo.done = !todo.done;
      updateTodoApi(username, todo.id, todo).then(() => {
        refreshTodos();
        if (todo.done) {
          setSelectedDoneTodos((prevSelected) => [...prevSelected, index]);
        } else {
          setSelectedDoneTodos((prevSelected) =>
            prevSelected.filter((selected) => selected !== index)
          );
        }
      });
    };
  }

  function handleDeleteTodo(id) {
    deleteTodoApi(username, id).then(() => {
      refreshTodos();
    });
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <div className="flex-grow overflow-x-auto bg-gray-900 shadow-md w-11/12 self-center rounded px-6 pt-6 pb-8 my-4 mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32">
        <div className="w-full flex flex-col font-bold mb-5">
          <h2 className="text-3xl font-semibold text-white mb-4">
            Todo for user: {username}
          </h2>
          <button
            className="bg-green-600 rounded-md p-3 text-white ease-in duration-300 hover:bg-green-950 mb-4 sm:mb-0"
            onClick={() => navigate(`/user/todo/-1`)}
          >
            Add New Todo
          </button>
        </div>
        <table className="min-w-full bg-slate-300 border-gray-500 border-2 shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left font-extrabold">
                ID
              </th>
              <th className="py-2 px-4 border-b text-left font-extrabold">
                Description
              </th>
              <th className="py-2 px-4 border-b text-left font-extrabold">
                Target Date
              </th>
              <th className="py-2 px-4 border-b text-center font-extrabold">
                Is Done?
              </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr
                key={todo.id}
                className={classnames("border-t", {
                  "bg-green-300":
                    todo.done && selectedDoneTodos.includes(index),
                  "bg-red-300": isOverdue(todo.targetDate) && !todo.done,
                  "bg-yellow-300": isToday(todo.targetDate) && !todo.done,
                })}
              >
                <td className="py-2 px-4 text-left font-sans font-semibold text-gray-650">
                  {todo.id}
                </td>
                <td className="py-2 px-4 text-left font-sans font-semibold text-gray-650">
                  {todo.description}
                </td>
                <td className="relative py-2 px-4 text-left font-sans font-semibold text-gray-650">
                  {todo.targetDate}
                </td>
                <td className="relative py-2 px-4 text-center font-sans font-semibold text-gray-650">
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={handleDoneTodoUpdate(todo, index)}
                  />
                  {(isOverdue(todo.targetDate) ||
                    (isToday(todo.targetDate) && !todo.done)) && (
                    <span
                      className={`${
                        todo.done ? "hidden" : "absolute -top-1 h-3 w-3"
                      }`}
                    >
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-400"></span>
                    </span>
                  )}
                </td>
                <td className="flex flex-col sm:flex-row justify-end items-center">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-900 ease-in duration-300 w-20 text-white font-bold mt-1 py-1 px-2 rounded mb-2 sm:mr-4 sm:mb-0"
                    onClick={() => handleUpdateTodo(todo.id)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-700 hover:bg-red-900 ease-in duration-300 w-20 text-white font-bold mt-1 py-1 px-2 rounded"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListTodoComponent;
