import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import session from 'express-session';
import redis from 'redis';
import connectRedis from 'connect-redis';
import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import * as winston from 'winston';

import { userRouter, authRouter, episodeRouter, seriesRouter } from './routes';
import db from './database';
import { authenticationMiddleware } from './utils';

const app = express();

// Basic security headers
app.use(helmet());

app.use(bodyParser.json());

// Trust NGINX for secure connection
app.set('trust proxy', 1);

// Sessions
const redisStore = connectRedis(session);
const redisClient = redis.createClient('redis://redis');
app.use(
  session({
    secret: process.env.COOKIE_SECRET || 'useenvfiles',
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, httpOnly: true, sameSite: 'strict' },
    store: new redisStore({
      host: 'redis',
      port: 6379,
      client: redisClient,
      ttl: 86400,
    }),
  })
);

// Passport configuration
const LocalStrategy = passportLocal.Strategy;
passport.use(
  new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
    try {
      const user = await db.User.scope('auth').findOne({
        where: { username },
      });

      if (!user) {
        return done({ status: 401 });
      }

      const isAuthenticated = await bcrypt.compare(password, user.password);

      if (isAuthenticated) {
        const sessionUser = { id: user.id, username: user.username };
        return done(null, sessionUser);
      } else {
        return done({ status: 401 });
      }
    } catch (error) {
      return done({ status: 500, error });
    }
  })
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await db.User.findOne({ where: { id } });

    if (!user) {
      return done({ status: 401 });
    }

    done(null, user);
  } catch (error) {
    return done({ status: 500, error });
  }
});

app.use(passport.initialize());
app.use(passport.session());

// Routing
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/episodes', authenticationMiddleware, episodeRouter);
app.use('/series', authenticationMiddleware, seriesRouter);

// Error handling
const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: '/var/log/series/errors.log',
      level: 'error',
    }),
  ],
  exceptionHandlers: [new winston.transports.File({ filename: '/var/log/series/exceptions.log' })],
});

// Send unhandled rejections to winston
process.on('unhandledRejection', (error) => {
  logger.error(error);
});

// Disable rule for next line as error handlers are not compatible
// with no-used-vars -rule.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (!error.status || error.status === 500) {
    logger.error(error);
    return res.status(500).json({ status: 500 });
  }

  res.status(error.status).json(error);
});

app.listen(3000);
