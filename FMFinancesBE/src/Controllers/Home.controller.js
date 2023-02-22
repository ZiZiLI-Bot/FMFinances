import mongoose from 'mongoose';
import { error, success } from '../Helpers/Response';
import HomeModule from '../Modules/Home.module';
import DebitModule from '../Modules/Debit.module';

const HomeController = {
  getHome: async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return error(res, null, 200, 'Home is not valid');
    const home = await HomeModule.findById(id);
    if (!home) return error(res, null, 200, 'Home not found');
    return success(res, home, 200, 'Get home success');
  },
  getAllHome: async (req, res) => {
    const home = await HomeModule.find();
    if (!home) return error(res, null, 200, 'Home not found');
    return success(res, home, 200, 'Get all home success');
  },
  createHome: async (req, res) => {
    const { name, joinId, uidCall } = req.body;
    const home = await HomeModule.create({
      name,
      members: [uidCall],
      joinId,
    });
    if (!home) return error(res, null, 200, 'Create home failed');
    return success(res, home, 200, 'Create home success');
  },
  addMemberToHome: async (req, res) => {
    // const {  } = req.params;
    const { uid, homeId } = req.body;
    const home = await HomeModule.findById(homeId);
    if (!home) return error(res, null, 200, 'Home not found');
    if (!mongoose.Types.ObjectId.isValid(uid)) return error(res, null, 200, 'User is not valid');
    if (home.members.includes(uid)) return error(res, null, 200, 'User is already in home');
    const createDebit = home.members.map(async (member) => {
      await DebitModule.create({
        homeId,
        uid1: member,
        uid2: uid,
        totalMoney: 0,
      });
    });
    await Promise.all(createDebit).catch(() => {
      return error(res, null, 200, 'Create debit failed');
    });
    home.members.push(uid);
    const updateHome = await home.save();
    if (!updateHome) return error(res, null, 200, 'Add member to home failed');
    return success(res, updateHome, 200, 'Add member to home success');
  },
};

export default HomeController;
