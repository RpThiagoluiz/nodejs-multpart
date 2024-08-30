// src/routes.ts
import { Router } from 'express';
import { uploadImage, getImageByClient } from './controllers/imageController';

const router = Router();

router.get('/healthCheck', (req, res) => {
  res.send('Hello World!');
});
router.post('/upload', uploadImage);
router.get('/image/:clientCode', getImageByClient);

export default router;
