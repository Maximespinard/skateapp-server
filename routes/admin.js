import express from 'express';

import { addAdmin, logAdmin } from '../controllers/admin.js';

const adminRouter = express.Router();

adminRouter.post('/add', addAdmin);
adminRouter.post('/login', logAdmin);

export default adminRouter;