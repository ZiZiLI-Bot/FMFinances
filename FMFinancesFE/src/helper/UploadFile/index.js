import UploadApi from '../../API/Upload.api';

const UploadFile = async (file) => {
  const formData = new FormData();
  formData.append('files', file);
  const res = await UploadApi.upload(formData);
  return res.data;
};

export default UploadFile;
