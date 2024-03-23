import { useParams, useNavigate, Link } from "react-router-dom";
import {
  retrieveTodoApi,
  createTodoApi,
  updateTodoApi,
} from "../../api/TodoApiService";
import { useAuth } from "../../security/AuthContext";
import { useCallback, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import moment from "moment";

function TodoComponent() {
  const { id } = useParams();
  const authContext = useAuth();
  const navigate = useNavigate();
  const username = authContext.username;
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const retrieveTodo = useCallback(() => {
    retrieveTodoApi(username, id)
      .then((response) => {
        setDescription(response.data.description);
        setTargetDate(response.data.targetDate);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, username]);

  useEffect(() => retrieveTodo(), [id, retrieveTodo]);

  function onSubmit(values) {
    const todo = {
      id: id,
      username: username,
      description: values.description,
      targetDate: values.targetDate,
      done: false,
    };

    console.log(todo);

    if (id == -1) {
      createTodoApi(username, todo)
        .then(() => {
          navigate("/user/todos");
        })
        .catch((error) => console.log(error));
    } else {
      updateTodoApi(username, id, todo)
        .then(() => {
          navigate("/user/todos");
        })
        .catch((error) => console.log(error));
    }
  }

  function validate(values) {
    let errors = {
      // description: "Enter a valid description",
      // targetDate: "Enter a valid target date",
    };

    if (values.description.length < 10) {
      errors.description = "Enter atleast 10 characters";
    }

    if (
      values.targetDate == null ||
      values.targetDate === "" ||
      !moment(values.targetDate).isValid()
    ) {
      errors.targetDate = "Enter a target date";
    }

    console.log(values);
    return errors;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
      <div className="flex-grow overflow-x-auto bg-gray-900 shadow-md w-11/12 self-center rounded px-6 pt-6 pb-8 my-4 mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32">
        <div className="container mx-auto mt-8 p-8 bg-slate-500 shadow-md rounded-md">
          <div className="flex flex-row justify-between items-baseline">
            <h1 className="text-3xl font-bold mb-6 text-white">
              Enter Todo Details
            </h1>
            <Link
              className="text-lg font-bold text-gray-700 ease-in duration-300 hover:text-white"
              to="/user/todos"
            >
              {" "}
              Back to todos
            </Link>
          </div>
          <Formik
            initialValues={{ description, targetDate }}
            enableReinitialize={true}
            onSubmit={onSubmit}
            validate={validate}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {() => (
              <Form>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-700 mb-2"
                />

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-white">
                    Description
                  </label>
                  <Field
                    type="text"
                    className="w-full p-2 border bg-gray-300 rounded-md"
                    name="description"
                  />
                </div>

                <ErrorMessage
                  name="targetDate"
                  component="div"
                  className="text-red-500 mb-2"
                />

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-white">
                    Target Date
                  </label>
                  <Field
                    type="date"
                    className="w-full p-2 border bg-gray-300 rounded-md"
                    name="targetDate"
                  />
                </div>

                <div>
                  <button
                    className="bg-green-500 text-white px-4 py-2 easy-in duration-300 hover:bg-green-900 rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default TodoComponent;
