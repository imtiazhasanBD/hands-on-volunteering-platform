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


const fetchEvents = async (filters = {}) => {
  try {
    const res = await axios.get(`${API_URL}/events`, { params: filters });
    return res.data;
  } catch (err) {
    console.error("Error fetching events:", err);
    throw err;
  }
};

const joinEvent = async (eventId) => {
  try {
    const response = await axios.post(`${API_URL}/events/${eventId}/join`, null, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return { success: true, message: response.data.message };
  } catch (err) {
    if (err.response && err.response.status === 400) {
      return { success: false, message: err.response.data.message, cause: err.response.data.cause };
    } else {
      console.error("Error joining event:", err);
      return { success: false, message: "Failed to join the event." };
    }
  }
};

// Fetch all help requests
export const getHelpRequests = async () => {
  try {
    const response = await axios.get(`${API_URL}/help-requests`);
    return response.data;
  } catch (error) {
    console.error("Error fetching help requests:", error);
    throw error;
  }
};

// Add a comment to a request
export const addCommentToRequest = async (token, requestId, message) => {
  try {
    const response = await axios.post(
      `${API_URL}/help-requests/offer/${requestId}`,  // ✅ Updated URL
      { message },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

export const createHelpRequest = async (token, formData) => {
  try {
    const response = await fetch("http://localhost:5000/api/help-requests/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create help request");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};




export { fetchEvents , joinEvent};
