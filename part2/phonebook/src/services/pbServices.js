import axios from "axios";

const baseUrl = "/api/persons";

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const add = async (personObj) => {
  const request = axios.post(baseUrl, personObj);
  const response = await request;
  return response.data;
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const replace = async (id, personObj) => {
  const request = axios.put(`${baseUrl}/${id}`, personObj);
  const response = await request;
  return response.data;
};

export default { getAll, add, remove, replace };
