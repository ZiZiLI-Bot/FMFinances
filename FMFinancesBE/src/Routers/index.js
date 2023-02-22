import express from 'express';
import AuthRouter from './Auth.routers';
import DebitRouter from './Debit.routers';
import HomeRouter from './Home.routers';

const Router = express.Router();

Router.use('/', AuthRouter);
Router.use('/', HomeRouter);
Router.use('/', DebitRouter);

export default Router;
