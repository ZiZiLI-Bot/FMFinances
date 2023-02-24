import axiosClient from './axiosClient';
const AuthApi = {
  register: async (data) => {
    const url = '/register';
    return await axiosClient.post(url, data);
  },
  login: async (data) => {
    const url = '/login';
    return await axiosClient.post(url, data);
  },
  getUserByEmail: async (data) => {
    const url = `/getUserByEmail/${data.email}`;
    return await axiosClient.get(url);
  },
};

export default AuthApi;
