import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import logger from 'morgan';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import router from './Routers';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

global.__basedir = __dirname;

dotenv.config();
const post = process.env.PORT;

const app = express();
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public/uploads'));

const server = createServer(app);

app.get('/', (req, res) => {
  res.send('Hello World! This is backend for FMFinances project');
});

app.use('/api', router);
app.use('/files', express.static('public/uploads'));

server.listen(post, () => {
  console.log('Server listening http://localhost:' + post);
});
