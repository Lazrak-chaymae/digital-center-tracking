import axios from "axios";

const AUTH_REST_API_URL = 'http://localhost:8765/api/todos';

export const addTodo = (todo) => axios.post(AUTH_REST_API_URL, todo);
export const listTodosByDomain = (domainId) => axios.get(AUTH_REST_API_URL + '/domain/' + domainId);
export const listTodosByProject = (projectId) => axios.get(AUTH_REST_API_URL + '/project/' + projectId);
export const updateTodo = (todoId, todo) => axios.put(AUTH_REST_API_URL + '/' + todoId , todo);
export const updateTodoName = (name, todoId) => axios.patch(AUTH_REST_API_URL + '/' + todoId + '/name', name,{
    headers: {
      "Content-Type": "text/plain",
    },
  });
export const updateTodoDetail = (detail, todoId) => axios.patch(AUTH_REST_API_URL + '/' + todoId + '/detail', detail,{
    headers: {
      "Content-Type": "text/plain",
    },
  });
export const updateTodoDeadline = (deadline, todoId) => axios.patch(AUTH_REST_API_URL + '/' + todoId + '/deadline', deadline,{
    headers: {
      "Content-Type": "text/plain",
    },
  });
export const updateTodoStatus = (status, todoId) => axios.patch(AUTH_REST_API_URL + '/' + todoId + '/status', status,{
    headers: {
      "Content-Type": "text/plain",
    },
  });
export const updateTodoUser = (todoId, userName) => axios.patch(AUTH_REST_API_URL + '/' + todoId + '/user', userName,{
    headers: {
      "Content-Type": "text/plain",
    },
  });

  export const updateTodoResponsible = (responsible, todoId) => axios.patch(AUTH_REST_API_URL + '/' + todoId + '/responsible', responsible,{
    headers: {
      "Content-Type": "text/plain",
    },
  });
export const deleteTodo = (todoId) => axios.delete(AUTH_REST_API_URL + '/' + todoId);

