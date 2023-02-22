import mongoose from 'mongoose';
import { error, success } from '../Helpers/Response';
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
  updateDebit: async (req, res) => {
    const { id } = req.params;
    const { totalMoney } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return error(res, null, 200, 'Debit is not valid');
    const Debit = await DebitModule.findById(id);
    if (!Debit) return error(res, null, 200, 'Debit not found');
    Debit.totalMoney = totalMoney;
    const updateDebit = await Debit.save();
    if (!updateDebit) return error(res, null, 200, 'Update Debit failed');
    return success(res, updateDebit, 200, 'Update Debit success');
  },
};

export default DebitController;
