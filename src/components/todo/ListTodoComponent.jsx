import React, { useState, useEffect, useCallback, useContext } from "react";
import classnames from "classnames";
import {
  retrieveAllTodosForUsernameApi,
  deleteTodoApi,
  updateTodoApi,
  executeUpdateTodosNotification,
} from "../../api/TodoApiService";
import { useAuth, AuthContext } from "../../security/AuthContext";
import { useNavigate } from "react-router-dom";
import PaginatorComponent from "../utils/PaginatorComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListTodoComponent = () => {
  const authContext = useAuth();
  const [todos, setTodos] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const { username, todosEmailNotification } = authContext;
  const navigate = useNavigate();

  const refreshTodos = useCallback(() => {
    retrieveAllTodosForUsernameApi(username)
      .then((response) => {
        setTodos(response.data);
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

  const sortTodosByDateAsc = () => {
    const sortedTodos = [...todos].sort((a, b) => {
      const dateA = new Date(a.targetDate);
      const dateB = new Date(b.targetDate);
      return dateA - dateB;
    });
    setTodos(sortedTodos);
  };

  const sortTodosByDateDesc = () => {
    const sortedTodos = [...todos].sort((a, b) => {
      const dateA = new Date(a.targetDate);
      const dateB = new Date(b.targetDate);
      return dateB - dateA;
    });
    setTodos(sortedTodos);
  };

  const sortTodosByIsDone = () => {
    const sortedTodos = [...todos].sort((a, b) => {
      return a.done === b.done ? 0 : a.done ? -1 : 1;
    });
    setTodos(sortedTodos);
  };

  function handleUpdateTodo(id) {
    navigate(`/user/todo/${id}`);
  }

  function handleDoneTodoUpdate(todo) {
    return () => {
      todo.done = !todo.done;
      updateTodoApi(username, todo.id, todo).then(() => {
        refreshTodos();
      });
    };
  }

  async function handleTodosNotificationUpdate() {
    const updatedNotification = !todosEmailNotification;
    await executeUpdateTodosNotification(username, updatedNotification)
      .then((response) => {
        toast.success(response.data);
        authContext.fetchData(username);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  }

  function handleDeleteTodo(id) {
    deleteTodoApi(username, id).then(() => {
      refreshTodos();
    });
  }

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTodos = todos.filter((todo) => {
    return (
      todo.description &&
      todo.description.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  });

  const indexOfLastTodo = currentPage * elementsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - elementsPerPage;
  const currentTodosOnPage = filteredTodos.slice(
    indexOfFirstTodo,
    indexOfLastTodo
  );

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredTodos.length / elementsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div id="user-todos" className="flex flex-col min-h-screen bg-gray-800">
      <ToastContainer position="top-right" autoClose={6000} />
      <div className="flex-grow overflow-x-auto bg-gray-900 shadow-md w-11/12 self-center rounded px-6 pt-6 pb-8 my-4 mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32">
        <div className="w-full flex flex-col font-bold mb-5 gap-4">
          <h2 className="text-3xl font-semibold text-white mb-4">
            Todo for user: {username}
          </h2>

          <div className="flex flex-row justify-between items-center gap-2">
            <button
              className="bg-green-600 w-[100px] rounded-md p-3 text-white ease-in duration-300 hover:bg-green-950 mb-4 sm:mb-0"
              onClick={() => navigate(`/user/todo/-1`)}
            >
              New
            </button>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
              <input
                type="text"
                placeholder="Find Description"
                className="py-1 px-2 w-40 bg-gray-300 font-normal text-gray-600 border-2 border-black rounded placeholder:font-normal placeholder:text-gray-600"
                value={searchTerm}
                onChange={handleSearchTermChange}
              />
              <div className="relative">
                <button
                  className="bg-gray-500 w-40 hover:bg-gray-700 ease-in duration-300 text-white font-bold py-1 px-2 rounded"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {showDropdown ? "Close" : "Options"}
                </button>
                {showDropdown && (
                  <div className="absolute top-8 right-0 mx-4 my-2 min-w-[220px] z-10  bg-white rounded shadow-md">
                    <ul className="list-none">
                      <li className="py-1 px-2 text-start hover:bg-gray-100">
                        <a
                          href="#user-todos"
                          className="text-gray-700 font-medium "
                          onClick={() => sortTodosByDateAsc()}
                        >
                          Sort by Date: Ascending
                        </a>
                      </li>
                      <li className="py-1 px-2 text-start hover:bg-gray-100">
                        <a
                          href="#user-todos"
                          className="text-gray-700 font-medium "
                          onClick={() => sortTodosByDateDesc()}
                        >
                          Sort by Date: Descending
                        </a>
                      </li>
                      <li className="py-1 px-2 text-start hover:bg-gray-100">
                        <a
                          href="#user-todos"
                          className="text-gray-700 font-medium "
                          onClick={() => sortTodosByIsDone()}
                        >
                          Sort done todos
                        </a>
                      </li>
                      <li className="py-1 px-2 text-start flex flex-row justify-between">
                        <p className="text-gray-700 font-medium">
                          Email Notifications?
                        </p>
                        <input
                          className="mr-2"
                          type="checkbox"
                          checked={todosEmailNotification}
                          onChange={handleTodosNotificationUpdate}
                        />
                      </li>

                      <li className="flex flex-row justify-between py-1 px-2 text-start hover:bg-gray-100">
                        <label
                          htmlFor="todos"
                          className="text-gray-700 font-medium"
                        >
                          Todos per page:
                        </label>
                        <select
                          className="text-gray-700 font-medium mr-2"
                          name="todos"
                          id="todos"
                          onChange={(e) =>
                            setElementsPerPage(parseInt(e.target.value))
                          }
                        >
                          <option value="10">10</option>
                          <option value="25">25</option>
                          <option value="50">50</option>
                        </select>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-slate-300 border-gray-500 border-2 shadow-md table-auto ">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left font-extrabold">
                  Description
                </th>
                <th className="py-2 px-4 border-b text-left font-extrabold">
                  Target Date
                </th>
                <th className="py-2 px-4 border-b text-center font-extrabold">
                  Is Done?
                </th>

                <th className="py-2 border-b text-end font-extrabold"></th>
              </tr>
            </thead>
            <tbody>
              {currentTodosOnPage.map((todo, index) => (
                <tr
                  key={todo.id}
                  className={classnames("border-t", {
                    "bg-green-300": todo.done,
                    "bg-red-300": isOverdue(todo.targetDate) && !todo.done,
                    "bg-yellow-300": isToday(todo.targetDate) && !todo.done,
                  })}
                >
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
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3w-3 bg-red-400"></span>
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
        <PaginatorComponent
          elementsPerPage={elementsPerPage}
          totalElements={filteredTodos.length}
          paginate={(pageNumber) => setCurrentPage(pageNumber)}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </div>
    </div>
  );
};

export default ListTodoComponent;
