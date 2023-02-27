import express from 'express';
import HomeController from '../Controllers/Home.controller';

const HomeRouter = express.Router();

HomeRouter.get('/home/:id', HomeController.getHome);
HomeRouter.get('/getAllHome', HomeController.getAllHome);
HomeRouter.get('/getHomeByUserId/:id', HomeController.getHomeByUserId);
HomeRouter.post('/createHome', HomeController.createHome);
HomeRouter.put('/addMemberToHome', HomeController.addMemberToHome);

export default HomeRouter;
