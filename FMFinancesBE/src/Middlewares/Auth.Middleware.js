import AuthServices from '../Services/Auth.service';
import AuthModule from '../Modules/Auth.module';
import { error } from '../Helpers/Response';

const AuthMiddleware = {
  isAuth: async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return error(res, null, 400, 'Access denied');
    }
    try {
      const verified = await AuthServices.verifyToken(token);
      if (!verified) {
        return error(res, null, 400, 'Invalid token');
      }
      const user = await AuthModule.findOne({ email: verified.email });
      req.user = user;
      next();
    } catch (err) {
      return error(res, err, 400, 'Invalid token');
    }
  },
};

export default AuthMiddleware;
