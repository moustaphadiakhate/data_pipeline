  import express from 'express';
  import orderRoutes from "./application/api/routers/orderRoutes";
  import projectorRoutes from "./application/api/routers/projectorRoutes";
  import morgan from 'morgan';
  import log4js from 'log4js';
  import { logger } from './domaine/services/logger';

  require('dotenv').config();
  const app = express();

  app.use(morgan('dev'));
  app.use(log4js.connectLogger(logger, { level: 'all' }));
  app.use(express.json());

  app.all('/health', (req, res) => res.status(200).json({"status":200, "msg": "Api niit shop... Nothing to see here."}));
  app.use('/v1/niit_shop', orderRoutes);
  app.use('/v1/sdk', projectorRoutes);

  app.use((req, res) => res.status(404).send('Not Found.'));

  app.listen(process.env.SERVICE_PORT, () => {
    console.log(`Server started on port ${process.env.SERVICE_PORT}`);
  });
