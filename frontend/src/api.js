import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? '/api'                           // in Docker, calls go to Nginx → api:8080
    : process.env.REACT_APP_API_URL;   // in dev, hit the local dotnet run

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export const fetchEntries = () => API.get('/travelentries');
export const createEntry  = data => API.post('/travelentries', data);
export const updateEntry  = (id, data) => API.put(`/travelentries/${id}`, data);
export const deleteEntry  = id => API.delete(`/travelentries/${id}`);
