import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; // Your backend URL
// const API_URL = 'http://localhost:8081/api'; // Your backend URL
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important: Send cookies (JWT)
});
axios.defaults.withCredentials = true

// Set Axios Default Headers (if needed, e.g., for Authorization)
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Utility function to set Authorization header
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Auth Routes

export const signupUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, formData,{withCredentials:true,});
    return response.data;
  } catch (error) {
    return error.response?.data || 'Signup failed';
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, formData, {
      withCredentials: true, // Ensures cookies are sent
    });
    console.log("Raw Response:", response)
    if (response.data?.user) {
      return response.data; // Returns user data if login is successful
    }

    throw new Error("Invalid login response");
  } catch (error) {
    console.error("Login failed:", error.response?.data?.message || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Login failed",
    };
  }
};


// Profile Routes

export const uploadProfileImage = async (formData) => {
  try {
      const response = await axios.post("http://localhost:8081/api/user/upload-profile", formData, {
          withCredentials: true, // Ensure cookies are sent for authentication
          headers: { "Content-Type": "multipart/form-data" }, // Important for file uploads
      });
      return response.data;
  } catch (error) {
      console.error("Error uploading profile image:", error);
      throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/profile`, {
      withCredentials: true, // ✅ Sends cookies automatically
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error.response?.data || error.message);
    return null;
  }
};

// User Routes

export const searchUsers = async (query) => {
    try {
      const response = await axios.get(`${API_URL}/user/search`, { params: { query } });
      return response.data;
    } catch (error) {
      return error.response?.data || 'Failed to search users';
    }
  };
  
  // Send a friend request
  export const sendFriendRequest = async (userId) => {
    try {
      const response = await axios.post(`${API_URL}/send-request`, { userId });
      return response.data;
    } catch (error) {
      return error.response?.data || 'Failed to send friend request';
    }
  };
  
  export const acceptFriendRequest = async (requestId) => {
    try {
      const response = await axios.post(
        `${API_URL}/accept-request`,
        { requestId }, // ✅ Ensure correct request body
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error accepting friend request:", error.response?.data || error.message);
      throw error;
    }
  };
  
  export const rejectFriendRequest = async (requestId) => {
    try {
      const response = await axios.post(
        `${API_URL}/reject-request`,
        { requestId }, // ✅ Ensure correct request body
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error rejecting friend request:", error.response?.data || error.message);
      throw error;
    }
  };
  // List friends of a specific user
  export const listFriends = async (username) => {
    try {
      const response = await axios.get(`${API_URL}/user/friends/${username}`);
      return response.data || [];
    } catch (error) {
      console.error("Error fetching friends:", error.response?.data || error.message);
      return []; // Return an empty array to avoid .map() errors
    }
  };
  

// Message Routes

export const sendPrivateMessage = async (messageData) => {
  try {
    const response = await axios.post(`${API_URL}/private-messages/send`, messageData);
    return response.data;
  } catch (error) {
    return error.response?.data || 'Message send failed';
  }
};

export const getMessages = async (conversationId) => {
  try {
    const response = await axios.get(`${API_URL}/private-messages/${conversationId}`);
    return response.data;
  } catch (error) {
    return error.response?.data || 'Failed to fetch messages';
  }
};

// Group Routes

export const createGroup = async (groupData) => {
  try {
    const response = await axios.post(`${API_URL}/group-messages/create`, groupData);
    return response.data;
  } catch (error) {
    return error.response?.data || 'Group creation failed';
  }
};

export const getGroupMessages = async (groupId) => {
  try {
    const response = await axios.get(`${API_URL}/group-messages/${groupId}`);
    return response.data;
  } catch (error) {
    return error.response?.data || 'Failed to fetch group messages';
  }
};

export const sendGroupMessage = async (messageData) => {
  try {
    const response = await axios.post(`${API_URL}/group-messages/send`, messageData);
    return response.data;
  } catch (error) {
    return error.response?.data || 'Failed to send group message';
  }
};
