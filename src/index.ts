import express, {
  Express,
  Request,
  Response,
  static as serve,
  json,
  urlencoded,
} from 'express';
import { join } from 'path';
import { config } from 'dotenv';
import { default as cors } from 'cors';
import { default as morgan } from 'morgan';
import router from './routes';
import { textContentTypeMiddleware } from './middlewares';

export const $: Express = express();
const PORT = process.env.PORT || 8080;

const conf = config();
if (conf.error) throw new Error(conf.error.message);
else console.log(conf.parsed);

// middleware
$.disable('etag');
$.disable('x-powered-by');
$.use(cors());
$.use(json());
$.use(morgan('dev'));
$.use(urlencoded({ extended: false }));
$.use(serve(join(__dirname, 'public')));

// custom middleware
$.use(textContentTypeMiddleware);

// routing
$.get('/', async (req: Request, res: Response) => {
  res.status(200).send({
    status: true,
    data: 'thank you sir',
    env: {team: process.env.TEAM, dev: process.env._DEV},
    path: req.path,
    timestamp: Math.trunc(Date.now() / 1000),
  });
});

$.all('/ping', async (req: Request, res: Response) => {
  res.status(200).send({
    status: true,
    data: 'pong',
    path: req.path,
    timestamp: Math.trunc(Date.now() / 1000),
  });
});

// router
$.use(router);

// 404
$.all('*', async (req: Request, res: Response) => {
  res.status(404).send({
    status: false,
    data: 'page not found',
    path: req.path,
    timestamp: Math.trunc(Date.now() / 1000),
  });
});

$.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
