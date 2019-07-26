var fs = require('fs');

var FILE = function() {};

FILE.prototype.save = function(base64, file_url, callback) {
	var base64Data = base64.split(',')[1];
	return fs.writeFile(
		file_url,
		base64Data,
		{
			flags: 'wx',
			encoding: 'base64'
		},
		function(err) {
			if (err) {
				console.error('writeFile', err);
				throw err;
			}

			callback();
		}
	);
};

FILE.prototype.get = function(path, isVideo) {
	var bitmap = fs.readFileSync(path);

	if (!isVideo) {
		try {
			return new Buffer(bitmap).toString('base64');
		} catch (e) {
			throw e;
		}
	} else {
		var binary = '';
		var bytes = new Uint8Array(bitmap);
		var len = bytes.byteLength;
		for (var i = 0; i < len; i++) {
			binary += String.fromCharCode(bytes[i]);
		}
		return new Buffer(binary).toString('base64');
	}
};

module.exports = new FILE();
