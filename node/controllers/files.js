var express = require('express');
var router = express.Router();
var multer = require('multer');
var FILE = require('../plugins/file');
var GOOGLEAPI = require('../plugins/googleapi');
GOOGLEAPI.init();

var upload = multer({
	limits: {
		fieldSize: 50 * 1024 * 1024
	}
});

router.post('/download', (req, res, next) => {
	var file = req.body;
	GOOGLEAPI.downloadGoogleDrive(file, file_url => {
		let base64 = FILE.get(file_url);
		res.send(200, {base64: base64});
	});
});

router.post('/upload', upload.fields([]), function(req, res, next) {
	let file = req.body;
	let file_url = 'files\\' + file.filename;
	FILE.save(file.base64, file_url, () => {
		GOOGLEAPI.uploadGoogleDrive(
			file.filename,
			file.mimeType,
			file_url,
			file_id => {
				res.status(200).send({file_id: file_id});
			}
		);
	});
});

router.get('/', (req, res, next) => {
	GOOGLEAPI.listGoogleDrive(files => {
		res.send(200, files);
	});
});

module.exports = router;
