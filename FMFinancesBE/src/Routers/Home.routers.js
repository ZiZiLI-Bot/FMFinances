import express from 'express';
import HomeController from '../Controllers/Home.controller';

const HomeRouter = express.Router();

HomeRouter.get('/home/:id', HomeController.getHome);
HomeRouter.get('/getAllHome', HomeController.getAllHome);
HomeRouter.post('/createHome', HomeController.createHome);
HomeRouter.post('/addMemberToHome', HomeController.addMemberToHome);

export default HomeRouter;
