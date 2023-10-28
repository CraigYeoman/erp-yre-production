import axios from 'axios';

const axiosServices = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/', withCredentials: true });

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

const serviceToken = window.localStorage.getItem('token')

console.log(`Bearer ${serviceToken}`)

if(serviceToken !== null) {
  axiosServices.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${serviceToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
}

// axiosServices.defaults.headers['Authorization'] = `Bearer ${serviceToken}`;

axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response.status === 401 && !window.location.href.includes('/login')) {
    //   window.location = '/login';
    // }
    return Promise.reject((error.response && error.response.data) || 'Wrong Services');
  }
);

export default axiosServices;