// src/server.ts
import express from 'express';
import path from 'path';
import routes from './routes';
import { initializeDatabase } from './services/databaseService';

const app = express();

app.use('/temp', express.static(path.join(__dirname, 'temp')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});
