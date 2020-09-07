import { config } from 'dotenv';
import express, {
  Express,
  Request,
  Response,
  static as serve,
  json,
  urlencoded,
} from 'express';
import { join } from 'path';
import { default as cors } from 'cors';
import { default as morgan } from 'morgan';
import router from './routes';
import { textContentTypeMiddleware } from './middlewares';

import { connect } from 'mongoose';
import { default as passport } from 'passport';

import './middlewares/passport-config';

const conf = config();
if (conf.error) throw new Error(conf.error.message);

export const bootstrap = async function () {
  const $: Express = express();
  const PORT = process.env.PORT || 8080;

  // middleware
  $.disable('etag');
  $.disable('x-powered-by');
  $.use(cors());
  $.use(json({limit:'10mb'}));
  $.use(morgan('dev'));
  $.use(urlencoded({ extended: false }));
  $.use(serve(join(__dirname, 'public')));
  $.use(passport.initialize());

  // custom middleware
  $.use(textContentTypeMiddleware);

  // routing
  $.get('/', async (req: Request, res: Response) => {
    res.status(200).send({
      status: true,
      data: 'thank you sir',
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

  return $;
};

// db connection.connect(
connect(process.env._DB_URL as any, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('DB Connected!');
    bootstrap();
  })
  .catch((err: any) => {
    console.log('DB Error!');
    console.log(err);
  });
