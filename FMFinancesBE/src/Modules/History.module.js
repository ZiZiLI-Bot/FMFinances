import mongoose from 'mongoose';
import Schema from '../Helpers/MongoDB';

const HistorySchema = new Schema(
  {
    id: Schema.Types.ObjectId,
    homeId: {
      type: Schema.Types.ObjectId,
    },
    DebitId: {
      type: Schema.Types.ObjectId,
    },
    content: {
      type: String,
    },
    type: {
      type: String,
    },
    uidCall: {
      type: Object,
    },
    infoUidTarget: {
      type: Object,
    },
  },
  {
    timestamps: true,
    collection: 'History',
  },
);

const HistoryModule = mongoose.model('History', HistorySchema);
export default HistoryModule;
