import Cryptr from 'cryptr';
import dotenv from 'dotenv';
dotenv.config();
export const cryptr = new Cryptr(process.env.DB_ENCRYPTION_KEY);
