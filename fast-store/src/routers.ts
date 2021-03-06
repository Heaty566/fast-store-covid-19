import * as I18n from 'i18n';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import { NextFunction, Request, Response } from 'express';
import * as session from 'express-session';
import { INestApplication } from '@nestjs/common';
import { NotFoundApiHandler } from './app/exception/notfound.exception';
import { RuntimeApiHandler } from './app/exception/runtime.exception';
import * as path from 'path';
import * as express from 'express';

I18n.configure({
      locales: ['en', 'vi'],
      directory: `./src/utils/locales/dictionaries`,
      cookie: 'lang',
      defaultLocale: 'en',
      missingKeyFn: (locale, value) => {
            console.log(locale);
            console.log(value);
            return value;
      },
});

export function routers(app: INestApplication) {
      //common middleware
      app.use(I18n.init);
      app.setGlobalPrefix('/api');
      app.use(cookieParser());
      app.enableCors({ origin: [process.env.CLIENT_URL, process.env.ADMIN_URL], credentials: true });
      app.use('/api/public', express.static(path.join(process.cwd(), 'public')));
      //session
      app.use(
            session({
                  secret: process.env.SESSION_SECRET,
                  resave: false,
                  saveUninitialized: false,
            }),
      );

      app.use(helmet());
      app.use(compression());
      app.useGlobalFilters(new NotFoundApiHandler());
      app.useGlobalFilters(new RuntimeApiHandler());

      //for developer
      if (process.env.NODE_ENV === 'development') {
            app.use(morgan('dev'));
      }

      //handle for multiple language
      app.use((req: Request, res: Response, next: NextFunction) => {
            //set header
            res.header('Access-Control-Allow-Methods', 'POST, GET, PUT');
            res.header('Access-Control-Allow-Headers', '*');
            I18n.setLocale('vi');

            next();
      });
}
