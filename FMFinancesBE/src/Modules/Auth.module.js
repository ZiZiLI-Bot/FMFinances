import mongoose from 'mongoose';
import Schema from '../Helpers/MongoDB';

const AuthSchema = new Schema(
  {
    id: Schema.Types.ObjectId,
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    avatar: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: 'Auth',
  },
);

const AuthModule = mongoose.model('Auth', AuthSchema);
export default AuthModule;
