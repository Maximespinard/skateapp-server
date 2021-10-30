import express from 'express';

import { getSpots } from '../controllers/spots.js';

const spotsRouter = express.Router();

spotsRouter.get('/', getSpots);

export default spotsRouter;