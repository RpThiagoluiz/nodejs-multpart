// src/services/databaseService.ts
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const initializeDatabase = async () => {
  const db = await open({
    filename: './src/database/sqlite.db',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clientCode TEXT UNIQUE,
      imageUrl TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
};

export const getImageByClientCode = async (clientCode: string) => {
  const db = await initializeDatabase();
  return db.get('SELECT * FROM images WHERE clientCode = ?', [clientCode]);
};

export const saveImage = async (clientCode: string, imageUrl: string) => {
  const db = await initializeDatabase();
  await db.run('INSERT OR REPLACE INTO images (clientCode, imageUrl) VALUES (?, ?)', [clientCode, imageUrl]);
};
