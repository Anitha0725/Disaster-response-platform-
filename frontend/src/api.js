import axios from 'axios';
const API_BASE = 'http://localhost:4000'; // Replace with deployed URL

export const createDisaster = (data) => axios.post(`${API_BASE}/disasters`, data);
export const getDisasters = () => axios.get(`${API_BASE}/disasters`);
export const geocodeDescription = (description) => axios.post(`${API_BASE}/geocode`, { description });
export const getSocialMedia = (id) => axios.get(`${API_BASE}/social-media/${id}/social-media`);
export const verifyImage = (id, data) => axios.post(`${API_BASE}/verification/${id}/verify-image`, data);
export const getResources = (id, lat, lon) => axios.get(`${API_BASE}/resources/${id}/resources?lat=${lat}&lon=${lon}`);
export const getOfficialUpdates = (id) => axios.get(`${API_BASE}/updates/${id}/official-updates`);
