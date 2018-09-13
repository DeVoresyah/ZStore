import promiseMiddleware from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';

const middlewares = [];

// middleware redux promise
const promise = promiseMiddleware();
middlewares.push(promise);

// middlewares logger
const logger = createLogger();
middlewares.push(logger);

export default middlewares;