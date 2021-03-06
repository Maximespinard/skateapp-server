import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

// routers
import spotsRouter from './routes/spots.js';
import adminRouter from './routes/admin.js';

dotenv.config();
// consts
const app = express();
const PORT = process.env.PORT || 4000;
const CONNECTION_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.lonzx.mongodb.net/skateapp?retryWrites=true&w=majority`;

// middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use('/spots', spotsRouter);
app.use('/admin', adminRouter);

/* eslint-disable no-debugger, no-console */
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`app lunched on port ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
