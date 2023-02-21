import express from 'express';
import AuthRouter from './Auth.routers';

const Router = express.Router();

Router.use('/auth', AuthRouter);

export default Router;
