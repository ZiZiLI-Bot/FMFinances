import AuthModule from '../Modules/Auth.module';
import HistoryModule from '../Modules/History.module';

const HistoryMiddleware = {
  createHistoryForUpdateDebit: async (data) => {
    const { totalMoney, id, uidCall, billType, homeId, uidTarget } = data;
    const infoUidCall = await AuthModule.findById(uidCall);
    const infoUidTarget = await AuthModule.findById(uidTarget);
    if (billType === 'add') {
      HistoryModule.create({
        DebitId: id,
        homeId,
        content: `${infoUidCall.username} đã thêm một khoản nợ ${totalMoney} cho ${infoUidTarget.username}`,
        uidCall: infoUidCall,
        infoUidTarget,
        type: billType,
      });
    } else {
      HistoryModule.create({
        DebitId: id,
        homeId,
        content: `${infoUidCall.username} đã trả một khoản nợ ${totalMoney} cho ${infoUidTarget.username}`,
        uidCall: infoUidCall,
        infoUidTarget,
        type: billType,
      });
    }
  },
};

export default HistoryMiddleware;
