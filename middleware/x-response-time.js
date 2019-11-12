'use strict';

const logger = require('../utils/logger');

module.exports = async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
  logger.info(`${ctx.method} ${ctx.url} ${ctx.status} - ${ms}`);
}