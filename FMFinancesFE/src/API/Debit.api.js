import axiosClient from './axiosClient';

const DebitApi = {
  getDebits: async (id) => {
    const res = await axiosClient.get(`/debit/${id}`);
    return res;
  },
  getAllDebitsByUid: async (data) => {
    const res = await axiosClient.post(`/getAllDebitExistByUid`, data);
    return res;
  },
};

export default DebitApi;
