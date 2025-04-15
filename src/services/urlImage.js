import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import dotenv from "dotenv";

dotenv.config()

export default function createTempUrlFromBase64(base64Data) {
  try {
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    
    const base64 = base64Data.includes(';base64,') ? base64Data.split(';base64,').pop() : base64Data;
    
    const filename = `${uuidv4()}.jpg`;
    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, Buffer.from(base64, 'base64'));
    
    const URL = `http://localhost:${process.env.PORT}/uploads/${filename}`;
    return URL;
  } catch (error) {
    console.error("Erro:", error);
    return null;
  }
}

