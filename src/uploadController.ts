// src/uploadController.ts
import { Request, Response } from 'express';
import path from 'path';
import { upload } from './services/storageService';

export const uploadImage = (req: Request, res: Response) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao fazer upload da imagem' });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'Imagem não fornecida' });
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/temp/${file.filename}`;
    return res.status(200).json({ url: fileUrl });
  });
};
