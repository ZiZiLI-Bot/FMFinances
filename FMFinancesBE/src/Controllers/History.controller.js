import mongoose from 'mongoose';
import { error, success } from '../Helpers/Response';
import HistoryModule from '../Modules/History.module';

const HistoryController = {
  getHistory: async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return error(res, null, 200, 'History is not valid');
    const History = await HistoryModule.findById(id);
    if (!History) return error(res, null, 200, 'History not found');
    return success(res, History, 200, 'Get History success');
  },
  getAllHistory: async (req, res) => {
    const History = await HistoryModule.find();
    if (!mongoose.Types.ObjectId.isValid(id)) return error(res, null, 200, 'History is not valid');
    if (!History) return error(res, null, 200, 'History not found');
    return success(res, History, 200, 'Get all History success');
  },
  getHistoryByHomeId: async (req, res) => {
    const { homeId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(homeId)) return error(res, null, 200, 'Home is not valid');
    const History = await HistoryModule.find({ homeId });
    if (!History) return error(res, null, 200, 'History not found');
    return success(res, History, 200, 'Get History success');
  },
};

export default HistoryController;
