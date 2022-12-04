 export const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': 'https://fierce-badlands-13020.herokuapp.com/',
};
// const baseUrl = 'http://localhost:3001/'
const baseUrl = 'https://fierce-badlands-13020.herokuapp.com/';

export const API_ROOT = `${baseUrl}api/v1`; 
export const API_WS_ROOT = `${baseUrl}cable`; 
export const API_MESSAGES = `${baseUrl}api/v1/messages`;
export const API_REQUESTS = `${baseUrl}api/v1/requests`; 
export const API_FULFILLMENTS = `${baseUrl}api/v1/fulfillments`; 
