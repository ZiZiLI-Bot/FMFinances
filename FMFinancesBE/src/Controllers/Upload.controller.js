import { error, success } from '../Helpers/Response';

const UploadController = {
  uploadMultipleFiles: async (req, res) => {
    const { files } = req;
    if (!files) {
      return error(res, null, 400, 'No files uploaded');
    }

    const data = [];
    files.forEach((file) => {
      data.push(`http://${req.headers.host}/files/${file.filename}`);
    });

    return success(res, data, 200, 'Files uploaded successfully');
  },
};

export default UploadController;
