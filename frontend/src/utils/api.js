import axios from "axios";

const API_URL = "http://localhost:5000/api"; 

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

export const getProfile = async (token) => {
  const response = await axios.get(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateProfile = async (token, updatedData) => {
  const response = await axios.put(`${API_URL}/auth/me`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getVolunteerHistory = async (token) => {
  const response = await axios.get(`${API_URL}/events/my-events`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


export const getUserJoinedEvents = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/events/attended-events`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user joined events:", error);
    throw error;
  }
};
