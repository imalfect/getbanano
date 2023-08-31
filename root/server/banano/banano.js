import bananojs from '@bananocoin/bananojs';
import dotenv from 'dotenv';
import './autoReceive.js';
dotenv.config();

bananojs.setBananodeApiUrl(process.env.BANANO_NODE_URL);
