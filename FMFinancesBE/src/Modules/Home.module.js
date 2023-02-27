import mongoose from 'mongoose';
import Schema from '../Helpers/MongoDB';

const HomeSchema = new Schema(
  {
    id: Schema.Types.ObjectId,
    name: {
      type: String,
    },
    members: {
      type: Array,
    },
    avatar: {
      type: String,
    },
    joinId: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: 'Home',
  },
);

const HomeModule = mongoose.model('Home', HomeSchema);
export default HomeModule;
