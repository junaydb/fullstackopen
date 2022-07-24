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

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const replace = (id, personObj) => {
  const request = axios.put(`${baseUrl}/${id}`, personObj);
  return request.then((response) => response.data);
};

export default { getAll, add, remove, replace };
