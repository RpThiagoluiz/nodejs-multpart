// src/services/storageService.ts
import multer from 'multer';
import path from 'path';
import fs from 'fs';


const tempDir = path.join(__dirname, '../temp');
const uniqueTime = Date.now();

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uniqueTime}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });

export const removeOldFiles = () => {
  const expirationTime = 20 * 60 * 60 * 1000;

  fs.readdir(tempDir, (err, files) => {
    if (err) {
      console.error('Erro ao ler diretório:', err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(tempDir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error('Erro ao obter informações do arquivo:', err);
          return;
        }

        if (Date.now() - stats.mtimeMs > expirationTime) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error('Erro ao deletar arquivo:', err);
            }
          });
        }
      });
    });
  });
};

setInterval(removeOldFiles, 60 * 60 * 1000);
