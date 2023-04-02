import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes/index.js';

const app = express();

app.use([json(), cors(), routes]);

export default app;
