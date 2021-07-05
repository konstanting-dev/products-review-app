import axios from 'axios';

import ErrorEventBus from 'src/utils/eventBus';

const axiosApiInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

// Response interceptor to get error message and emit new 'responseError' event with it
// We listen to 'responseError' event in Snackbar provider to show errors in the app
axiosApiInstance.interceptors.response.use(
  (value) => value,
  (error) => {
    ErrorEventBus.emit('responseError', error.message);
    return Promise.reject(error);
  },
);

export default axiosApiInstance;
