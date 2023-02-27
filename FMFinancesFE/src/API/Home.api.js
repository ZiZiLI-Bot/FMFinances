import axiosClient from './axiosClient';

const HomeApi = {
  getAllHomeByUid: async (uid) => {
    const url = `/getHomeByUserId/${uid}`;
    return await axiosClient.get(url);
  },
  getHome: async (id) => {
    const url = `/home/${id}`;
    return await axiosClient.get(url);
  },
  createHome: async (data) => {
    const url = '/createHome';
    return await axiosClient.post(url, data);
  },
};

export default HomeApi;
