import express, { Request, Response } from 'express';
import axios, { AxiosRequestConfig } from 'axios';
import { validateRequestParams } from "../services/validateRequestParams";
import { Order } from "../../types/order/OrderRequest";

require('dotenv').config();
const router = express.Router();

router.post('/', Order, validateRequestParams, (req: Request, res: Response) => {
  res.status(200).send('ok');
});

export default router;
