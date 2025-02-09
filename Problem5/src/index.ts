import dotenv from 'dotenv';
import express from 'express';
import { startDatabase } from './services/sql';

import ResourcesRoutes from './routes/resources.routes';

dotenv.config();

const { PORT } = process.env;

const app = express();

app.use(express.json());

// Routes
const version: string = 'v1';
const prefix: string = `/api/${version}`;

app.use(`${prefix}/resources`, ResourcesRoutes);

// Handlers
// TODO: Move Handlers;
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//Start Database
startDatabase();

const port = PORT || '3000';
app.listen(port, () => {
  console.log('Listening port ', port);
});
