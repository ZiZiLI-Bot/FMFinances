import mongoose from 'mongoose';
import { error, success } from '../Helpers/Response';
import HistoryMiddleware from '../Middlewares/History.Middleware';
import DebitModule from '../Modules/Debit.module';

const DebitController = {
  getDebit: async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return error(res, null, 200, 'Debit is not valid');
    const Debit = await DebitModule.findById(id);
    if (!Debit) return error(res, null, 200, 'Debit not found');
    return success(res, Debit, 200, 'Get Debit success');
  },
  getAllDebit: async (req, res) => {
    const Debit = await DebitModule.find();
    if (!mongoose.Types.ObjectId.isValid(id)) return error(res, null, 200, 'Debit is not valid');
    if (!Debit) return error(res, null, 200, 'Debit not found');
    return success(res, Debit, 200, 'Get all Debit success');
  },
  getDebitByHomeId: async (req, res) => {
    const { id } = req.params;
    const { homeId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return error(res, null, 200, 'Debit is not valid');
    if (!mongoose.Types.ObjectId.isValid(homeId)) return error(res, null, 200, 'Home is not valid');
    const Debit = await DebitModule.find({ $and: [{ _id: id }, { homeId: homeId }] });
    if (!Debit) return error(res, null, 200, 'Debit not found');
    return success(res, Debit, 200, 'Get Debit success');
  },
  getAllDebitByHomeId: async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return error(res, null, 200, 'Home is not valid');
    const Debit = await DebitModule.find({ homeId: id });
    if (!Debit) return error(res, null, 200, 'Debit not found');
    return success(res, Debit, 200, 'Get all Debit success');
  },
  getDebitByUid: async (req, res) => {
    const { homeId, uid } = req.body;
    if (!mongoose.Types.ObjectId.isValid(uid)) return error(res, null, 200, 'User is not valid');
    if (!mongoose.Types.ObjectId.isValid(homeId)) return error(res, null, 200, 'Home is not valid');
    const Debit = await DebitModule.find({ homeId, $or: [{ uid1: uid }, { uid2: uid }] });
    if (!Debit) return error(res, null, 200, 'Debit not found');
    return success(res, Debit, 200, 'Get Debit success');
  },
  // createDebit: async (req, res) => {
  //   const { uid1, uid2, totalMoney, homeId } = req.body;
  //   const checkDebit = await DebitModule.find({ $and: [{ uid1 }, { uid2 }, { homeId }] });
  //   if (checkDebit.length !== 0) return error(res, null, 200, 'Debit is exist');
  //   const Debit = await DebitModule.create({
  //     uid1,
  //     uid2,
  //     totalMoney,
  //     homeId,
  //   });
  //   if (!Debit) return error(res, null, 200, 'Create Debit failed');
  //   return success(res, Debit, 200, 'Create Debit success');
  // },
  getAllDebitExistByUid: async (req, res) => {
    const { homeId, uid } = req.body;
    if (!mongoose.Types.ObjectId.isValid(uid)) return error(res, null, 200, 'User is not valid');
    if (!mongoose.Types.ObjectId.isValid(homeId)) return error(res, null, 200, 'Home is not valid');
    const Debit = await DebitModule.find({ homeId, $or: [{ uid1: uid }, { uid2: uid }], totalMoney: { $ne: 0 } });
    if (!Debit) return error(res, null, 200, 'Debit not found');
    return success(res, Debit, 200, 'Get Debit success');
  },
  updateDebit: async (req, res) => {
    const { totalMoney, id, uidCall, billType } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return error(res, null, 200, 'Debit is not valid');
    const Debit = await DebitModule.findById(id);
    if (!Debit) return error(res, null, 200, 'Debit not found');
    if (billType === 'sub') {
      // Lệnh xóa nợ
      if (Debit.billOwnerId == uidCall) {
        // Nếu người gọi lệnh là người đang được nợ trường hợp này không xảy ra!
        Debit.totalMoney = Debit.totalMoney + totalMoney;
      } else {
        // Nếu người gọi lệnh là người nợ thì trừ tiền
        const newTotalMoney = Debit.totalMoney - totalMoney;
        if (newTotalMoney < 0) {
          // Nếu số tiền còn lại nhỏ hơn 0 thì người nợ trả hết tiền cho người được nợ
          Debit.totalMoney = Math.abs(newTotalMoney);
          // Nêu nó trở thành số âm thì chuyển người được nợ thành người nợ
          Debit.billOwnerId = uidCall;
        }
      }
    } else if (billType === 'add') {
      // Lệnh thêm nợ
      if (Debit.billOwnerId == uidCall) {
        // Nếu người gọi lệnh là người đang được nợ thì cộng tiền
        const newTotalMoney = Debit.totalMoney + totalMoney;
        // Trường hợp này chỉ cộng tiền thôi không cần chuyển người được nợ
        Debit.totalMoney = newTotalMoney;
      } else {
        // Nếu người gọi lệnh là người nợ thì trừ tiền
        const newTotalMoney = Debit.totalMoney - totalMoney;
        if (newTotalMoney < 0) {
          // Nếu số tiền còn lại nhỏ hơn 0 thì người nợ trả hết tiền cho người được nợ
          Debit.totalMoney = Math.abs(newTotalMoney);
          // Nêu nó trở thành số âm thì chuyển người được nợ thành người nợ
          Debit.billOwnerId = uidCall;
        }
      }
    }
    const updateDebit = await Debit.save();
    if (!updateDebit) return error(res, null, 200, 'Update Debit failed');
    const createHistoryData = {
      ...req.body,
      uidTarget: Debit.uid1 === uidCall ? Debit.uid2 : Debit.uid1,
      homeId: Debit.homeId,
    };
    await HistoryMiddleware.createHistoryForUpdateDebit(createHistoryData);
    return success(res, updateDebit, 200, 'Update Debit success');
  },
};

export default DebitController;
