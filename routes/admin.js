import express from 'express';

import { addAdmin } from '../controllers/admin.js';

const adminRouter = express.Router();

adminRouter.post('/add', addAdmin);

export default adminRouter;