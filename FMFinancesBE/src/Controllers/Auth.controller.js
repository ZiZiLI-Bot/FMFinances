import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import pkg from 'rand-token';
import { error, success } from '../Helpers/Response';
import AuthServices from '../Services/Auth.service';
import AuthModule from '../Modules/Auth.module';

const AuthController = {
  register: async (req, res) => {
    const { email, password, username, phoneNumber, avatar } = req.body;
    const reqUser = await AuthModule.findOne({ email, username });
    if (reqUser) {
      error(res, null, 400, 'User or Email already exists');
    } else {
      const hashPassword = bcrypt.hashSync(password, 10);
      AuthModule.create({
        _id: mongoose.Types.ObjectId(),
        email,
        password: hashPassword,
        username,
        phoneNumber,
        avatar,
      })
        .then((data) => {
          success(res, data, 200, 'User created successfully');
        })
        .catch((err) => {
          error(res, err, 400, 'User creation failed');
        });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await AuthModule.findOne({ email });
    if (!user) {
      return error(res, null, 400, 'User does not exist');
    }
    const reqPassword = await bcrypt.compare(password, user.password);
    if (!reqPassword) {
      return error(res, null, 400, 'Incorrect password');
    }
    const dataForAccessToken = {
      email,
    };
    const token = await AuthServices.generateToken(dataForAccessToken);
    if (!token) {
      return error(res, null, 400, 'Token generation failed');
    }
    let refreshToken = pkg.generate(token.length);
    if (!refreshToken) {
      return error(res, null, 400, 'Refresh token generation failed');
    }
    if (!user.refreshToken) {
      AuthModule.findByIdAndUpdate(
        user._id,
        {
          refreshToken: refreshToken,
        },
        (err) => {
          if (err) {
            return error(res, err, 400, 'Refresh token update failed');
          }
        },
      );
    } else {
      refreshToken = user.refreshToken;
    }

    const data = {
      token,
      refreshToken,
      _id: user._id,
      email: user.email,
      username: user.username,
      phoneNumber: user.phoneNumber,
      avatar: user.avatar,
    };
    return success(res, data, 200, 'Login successful');
  },
  refreshToken: async (req, res) => {
    const accessToken = req.header('authorization');
    const { refreshToken } = req.body;
    console.log(accessToken, refreshToken);
    if (!accessToken || !refreshToken) {
      return error(res, null, 400, 'Access token or refresh token not found');
    }
    const decoded = await AuthServices.verifyToken(accessToken);
    if (!decoded) {
      return error(res, null, 400, 'Access token verification failed');
    }
    const user = await AuthModule.findOne({ email: decoded.email });
    if (!user) {
      return error(res, null, 400, 'User not found');
    }
    if (user.refreshToken !== refreshToken) {
      return error(res, null, 400, 'Refresh token mismatch');
    }
    const dataForAccessToken = {
      email: user.email,
    };
    const token = await AuthServices.generateToken(dataForAccessToken);
    if (!token) {
      return error(res, null, 400, 'Token generation failed');
    }
    const data = {
      token,
    };
    return success(res, data, 200, 'Token refreshed successfully');
  },
  loginWithJWT: async (req, res) => {
    const token = req.header('authorization');
    const { email } = await AuthServices.verifyToken(token);
    const user = await AuthModule.findOne({ email });
    if (!user) return error(res, null, 400, 'User not found');
    return success(res, user, 200, 'User found');
  },
  getUserByEmail: async (req, res) => {
    const { email } = req.params;
    const user = await AuthModule.findOne({ email });
    if (!user) return error(res, null, 400, 'User not found');
    return success(res, user, 200, 'User found');
  },
};

export default AuthController;
