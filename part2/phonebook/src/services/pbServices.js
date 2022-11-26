import axios from "axios";

const baseUrl = "/api/persons";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const add = async (personObj) => {
  const response = await axios.post(baseUrl, personObj);
  return response.data;
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const replace = async (id, personObj) => {
  const response = await axios.put(`${baseUrl}/${id}`, personObj);
  return response.data;
};

const pbServices = {
  getAll,
  add,
  remove,
  replace,
};

export default pbServices;
