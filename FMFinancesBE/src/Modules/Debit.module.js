import mongoose from 'mongoose';
import Schema from '../Helpers/MongoDB';

const DebitSchema = new Schema(
  {
    id: Schema.Types.ObjectId,
    homeId: {
      type: Schema.Types.ObjectId,
    },
    uid1: {
      type: Schema.Types.ObjectId,
    },
    uid2: {
      type: Schema.Types.ObjectId,
    },
    billOwnerId: {
      type: Schema.Types.ObjectId,
    },
    totalMoney: {
      type: Number,
    },
  },
  {
    timestamps: true,
    collection: 'Debit',
  },
);

const DebitModule = mongoose.model('Debit', DebitSchema);
export default DebitModule;
