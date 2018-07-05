import axios from 'axios';

import config from 'config';

let axiosInstance = axios.create({
  baseURL: config.get('baseUrl'),
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },
});

axiosInstance.interceptors.request.use((config) => {
  // Put Authentication Here,
  return config;
}, (err) => {
  return Promise.reject(err);
});

axiosInstance.interceptors.response.use((response) => {
  return response;
}, (err) => {
  if (err.response) {
    if (err.response.status === 401) {
      //Put Redirect Here
    }
  }
  return Promise.reject(err);
});

export default axiosInstance;
