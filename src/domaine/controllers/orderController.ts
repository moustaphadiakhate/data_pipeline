import express, { Request, Response } from 'express';
import { validateRequestParams } from "../services/validateRequestParams";
import { Order } from "../../types/order/OrderRequest";

require('dotenv').config();
const router = express.Router();

router.post('/', Order, validateRequestParams, (req: Request, res: Response) => {
  res.status(200).json({"status": "OK", "msg": "Ordered successfully"});
});

export default router;
