import express from 'express';
import AuthController from '../Controllers/Auth.controller';
const AuthRouter = express.Router();

AuthRouter.post('/login', AuthController.login);
AuthRouter.post('/register', AuthController.register);
AuthRouter.post('/refresh-token', AuthController.refreshToken);
AuthRouter.get('/loginWithJWT', AuthController.loginWithJWT);
AuthRouter.get('/getUserByEmail/:email', AuthController.getUserByEmail);

export default AuthRouter;
