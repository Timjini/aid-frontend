import axios from 'axios';

// const baseUrl = 'http://localhost:3001/';
const baseUrl = 'https://fierce-badlands-13020.herokuapp.com/';

const login = payload => axios.post(`${baseUrl}api/v1/login`, payload);

const logout = () => axios.delete(`${baseUrl}api/v1/logout`);

const signup = payload => axios.post(`${baseUrl}api/v1/users`, payload);

const getUsers = payload => axios.get(`${baseUrl}api/v1/users`, payload);


const request = payload => axios.post(`${baseUrl}api/v1/requests`, payload);

const getrequest = payload => axios.get(`${baseUrl}api/v1/requests`, payload);

const postFulfillment = payload => axios.post(`${baseUrl}api/v1/requests`, payload);




const authenticationApi = {
  login,
  logout,
  signup,
  request,
  getrequest,
  getUsers,
  postFulfillment
};

export default authenticationApi;
