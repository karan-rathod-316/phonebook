import axios from "axios";

const baseUrl = "http://localhost:3001/contacts";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};

const addContact = (contact) => {
  const request = axios.post(baseUrl, contact);
  return request.then((res) => res.data);
};

const deleteContact = (id) => {
  axios.delete(`${baseUrl}/${id}`);
};

const updateContact = (id, updatedContact) => {
  let request = axios.put(`${baseUrl}/${id}`, updatedContact);
  return request.then((res) => res.data);
};

let contactsServices = { getAll, addContact, deleteContact, updateContact };

export default contactsServices;
