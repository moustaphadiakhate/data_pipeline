import express, { Request, Response } from 'express';
import axios, { AxiosRequestConfig } from 'axios';
import { validateRequestParams } from "../../../domaine/services/validateRequestParams";
import { Client } from "../../../types/projector/GetClientOrderRequest";
import projectorController from "../../../domaine/controllers/projectorController";
require('dotenv').config();
const router = express.Router();

router.use('/get_order', projectorController);

export default router;
