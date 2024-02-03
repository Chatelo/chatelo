import { useNavigate } from 'react-router-dom';
import axiosService from '../../helpers/axios';
import axios from 'axios';

function useUserActions() {
  const navigate = useNavigate();
  const baseURL = 'http://localhost:8000/api';

  return {
    login,
    register,
    logout,
    edit,
  };

  // Login the user
  async function login(data) {
    try {
      const res = await axios.post(`${baseURL}/auth/login/`, {
        email: data.username, // Update this line based on server expectations
        password: data.password,
      });
      setUserData(res.data);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error (you might want to set an error state here)
      if (error.response) {
        // The request was made, but the server responded with a status code
        // other than 2xx. Log the response data for debugging.
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made, but no response was received.
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error.
        console.error('Error setting up the request:', error.message);
      }

      // Handle error (you might want to set an error state here)
    }
  }

  // Register the user
  async function register(data) {
    const res = await axios.post(`${baseURL}/auth/register/`, data);
    // Registering the account and tokens in the store
    setUserData(res.data);
    navigate('/login');
  }

  // Edit the user
  async function edit(data, userId) {
    const res = await axiosService.patch(`${baseURL}/user/${userId}/`, data, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    // Registering the account in the store
    localStorage.setItem(
      'auth',
      JSON.stringify({
        access: getAccessToken(),
        refresh: getRefreshToken(),
        user: res.data,
      })
    );
  }

  // Logout the user
  async function logout() {
    await axiosService.post(`${baseURL}/auth/logout/`, {
      refresh: getRefreshToken(),
    });
    localStorage.removeItem('auth');
    navigate('/login');
  }
}

// Get the user
function getUser() {
  const auth = JSON.parse(localStorage.getItem('auth')) || null;
  if (auth) {
    return auth.user;
  } else {
    return null;
  }
}

// Get the access token
function getAccessToken() {
  const auth = JSON.parse(localStorage.getItem('auth'));
  return auth.access;
}

// Get the refresh token
function getRefreshToken() {
  const auth = JSON.parse(localStorage.getItem('auth'));
  return auth.refresh;
}

// Set the access, token and user property
function setUserData(data) {
  localStorage.setItem(
    'auth',
    JSON.stringify({
      access: data.access,
      refresh: data.refresh,
      user: data.user,
    })
  );
}

export {
  useUserActions,
  getUser,
  getAccessToken,
  getRefreshToken,
  setUserData,
};
