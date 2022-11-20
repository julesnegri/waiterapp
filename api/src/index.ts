import * as dotenv from 'dotenv';
import path from 'node:path';
import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';

dotenv.config();

mongoose.connect(`mongodb://${process.env.MONGOUSER}:${process.env.MONGOPASSWORD}@${process.env.MONGOHOST}:${process.env.MONGOPORT}`)
  .then(() => {
    const app = express();
    const port = 3001;
    const hostname = '127.0.0.1';

    console.log('conectado ao mongoDB');

    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);


    app.listen(port, () => {
      console.log(`✨ Server is running on http://${hostname}:${port}`);
    });
  })
  .catch(() => console.log('❌ Error ao conectar no mongoDB'));


