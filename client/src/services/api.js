import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Get all leads, with optional search and status filters
export const getLeads = async (params = {}) => {
  const response = await api.get("/leads", { params });
  return response.data;
};

// Get one lead by ID
export const getLeadById = async (id) => {
  const response = await api.get(`/leads/${id}`);
  return response.data;
};

// Create a new lead
export const createLead = async (leadData) => {
  const response = await api.post("/leads", leadData);
  return response.data;
};

// Update an existing lead
export const updateLead = async (id, leadData) => {
  const response = await api.put(`/leads/${id}`, leadData);
  return response.data;
};

// Delete a lead
export const deleteLead = async (id) => {
  const response = await api.delete(`/leads/${id}`);
  return response.data;
};

// Check backend health
export const checkApiHealth = async () => {
  const response = await api.get("/health");
  return response.data;
};

export default api;
