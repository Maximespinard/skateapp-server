import express from 'express';
import expressJwt from 'express-jwt';
import dotenv from 'dotenv';

import { addAdmin, getAdmin, logAdmin } from '../controllers/admin.js';

const secret = process.env.SECRET;
const adminRouter = express.Router();
const expressJwtOptions = {
  secret,
  getToken: (req) => req.cookies.token,
  algorithms: ['HS256'],
};
dotenv.config();

adminRouter.post('/login', logAdmin);
adminRouter.post('/add', expressJwt(expressJwtOptions), addAdmin);
adminRouter.get('/get/:id', expressJwt(expressJwtOptions), getAdmin);

export default adminRouter;
