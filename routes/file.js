/**
 * Created by zfx on 06/26/2019
 * meta
 */
const Router = require('@zhangfuxing/koa-router');
const Busboy = require('busboy');
const logger = require('../utils/logger');
const fs = require('fs');
const router = new Router({
	prefix: '/api/v1/file'
});

router
	.post('/', async ctx => {
		const busboy = new Busboy({ headers: ctx.headers });

		await new Promise((resolve, reject) => {
			busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
				file.pipe(fs.createWriteStream(`./public/${filename}`));
			});
	
			busboy.on('finish', function () {
				logger.info('finished');
			});

			busboy.on('error', reject);
	
			ctx.req.pipe(busboy);
		});

		ctx.body = {
			success: true
		};
	})

module.exports = router