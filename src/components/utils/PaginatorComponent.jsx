import React from "react";

const PaginatorComponent = ({
  todosPerPage,
  totalTodos,
  paginate,
  nextPage,
  prevPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTodos / todosPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-4 flex justify-center">
      <div className="flex flex-row h-10">
        {" "}
        <button
          className="bg-gray-400 hover:bg-gray-600 ease-in duration-300  text-white font-bold py-2 px-4 mx-1 rounded"
          onClick={prevPage}
        >
          <svg
            className="w-8 h-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.5 15a.5.5 0 01-.5-.5v-13a.5.5 0 011 0v13a.5.5 0 01-.5.5zM10 8a.5.5 0 01-.5.5H3.707l2.147 2.146a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 11.708.708L3.707 7.5H9.5a.5.5 0 01.5.5z"
            />
          </svg>
        </button>
        <ul className="flex">
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                className="bg-gray-400 hover:bg-gray-600 ease-in duration-300 text-white font-bold py-2 px-4 mx-1 rounded"
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
        <button
          className="bg-gray-400 hover:bg-gray-600 ease-in duration-300 text-white font-bold py-2 px-4 mx-1 rounded"
          onClick={nextPage}
        >
          <svg
            className="w-8 h- fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 8a.5.5 0 00.5.5h5.793l-2.147 2.146a.5.5 0 00.708.708l3-3a.5.5 0 000-.708l-3-3a.5.5 0 00-.708.708L12.293 7.5H6.5A.5.5 0 006 8zm-2.5 7a.5.5 0 01-.5-.5v-13a.5.5 0 011 0v13a.5.5 0 01-.5.5z"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default PaginatorComponent;
