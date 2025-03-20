import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response.data; // Chỉ trả về data, không trả về nguyên response
  },
  function (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return Promise.resolve(null); // Trả về null thay vì reject lỗi
    }
    return Promise.reject(error); // Các lỗi khác vẫn xử lý bình thường
  },
);

export default instance;
