
// src/controllers/imageController.ts
import { Request, Response } from 'express';
import { upload } from '../services/storageService';
import { getImageByClientCode, saveImage } from '../services/databaseService';

export const uploadImage = (req: Request, res: Response) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao fazer upload da imagem' });
    }

    const file = req.file;
    const { clientCode } = req.body;

    if (!file) {
      return res.status(400).json({ message: 'Imagem do cliente não fornecido' });
    }

    if (!clientCode) {
      return res.status(400).json({ message: 'Código do cliente não fornecido' });
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/temp/${file.filename}`;

    await saveImage(clientCode, fileUrl);

    return res.status(200).json({ url: fileUrl });
  });
};

export const getImageByClient = async (req: Request, res: Response) => {
  const { clientCode } = req.params;

  const imageRecord = await getImageByClientCode(clientCode);

  if (!imageRecord) {
    return res.status(404).json({ message: 'Imagem não encontrada para o cliente fornecido' });
  }

  return res.status(200).json({ url: imageRecord.imageUrl });
};
