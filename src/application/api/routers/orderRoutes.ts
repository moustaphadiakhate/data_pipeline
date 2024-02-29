import express, { Request, Response } from 'express';
import { validateRequestParams } from "../../../domaine/services/validateRequestParams";
import { Order } from "../../../types/order/OrderRequest";
import orderController from "../../../domaine/controllers/OrderController";

require('dotenv').config();
const router = express.Router();

router.use('/order', orderController);

export default router;
