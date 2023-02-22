import express from 'express';
import DebitController from '../Controllers/Debit.controller';

const DebitRouter = express.Router();

DebitRouter.get('/debit/:id', DebitController.getDebit);
DebitRouter.get('/getAllDebit', DebitController.getAllDebit);
DebitRouter.get('/getDebitByHomeId/:id', DebitController.getDebitByHomeId);
DebitRouter.get('/getAllDebitByHomeId/:id', DebitController.getAllDebitByHomeId);
DebitRouter.get('/getDebitByUserId', DebitController.getDebitByUid);
// DebitRouter.post('/createDebit', DebitController.createDebit);
DebitRouter.put('/updateDebit/:id', DebitController.updateDebit);

export default DebitRouter;
