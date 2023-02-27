import express from 'express';
import AuthRouter from './Auth.routers';
import DebitRouter from './Debit.routers';
import HomeRouter from './Home.routers';
import UploadRouter from './Upload.router';

const Router = express.Router();

Router.use('/', AuthRouter);
Router.use('/', HomeRouter);
Router.use('/', DebitRouter);
Router.use('/', UploadRouter);

export default Router;
