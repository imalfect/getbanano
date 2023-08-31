import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
export const mainDB = mongoose.createConnection(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'GetBanano_Main',
});
export const faucetsDB = mongoose.createConnection(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'GetBanano_Faucets',
});
