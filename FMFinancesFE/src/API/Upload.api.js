import axiosClient from './axiosClient';

const UploadApi = {
  upload: async (data) => {
    const url = '/uploads';
    return await axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default UploadApi;
