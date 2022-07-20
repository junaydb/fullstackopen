import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const add = (personObj) => {
  const request = axios.post(baseUrl, personObj);
  return request.then((response) => response.data);
};

const remove = (id, name) => {
  const confirm = window.confirm(`Delete ${name}?`);
  if (confirm) {
    return axios.delete(baseUrl + `/${id}`);
  }
};

const replace = (id, personObj) => {
  return axios.put(baseUrl + `/${id}`, personObj);
};

export default { getAll, add, remove, replace };
