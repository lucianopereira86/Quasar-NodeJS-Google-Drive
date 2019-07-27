const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
var FILE = require('./file');

var GOOGLEAPI = function() {};
var auth = null;

GOOGLEAPI.prototype.init = function() {
	// If modifying these scopes, delete token.json.
	const SCOPES = [
		'https://www.googleapis.com/auth/drive',
		'https://www.googleapis.com/auth/drive.file',
		'https://www.googleapis.com/auth/drive.appdata',
		'https://www.googleapis.com/auth/drive.apps.readonly',
		'https://www.googleapis.com/auth/drive.readonly',
		'https://www.googleapis.com/auth/drive.metadata.readonly',
		'https://www.googleapis.com/auth/drive.metadata',
		'https://www.googleapis.com/auth/drive.photos.readonly'
	];
	// The file token.json stores the user's access and refresh tokens, and is
	// created automatically when the authorization flow completes for the first
	// time.
	const TOKEN_PATH = 'token.json';

	// Load client secrets from a local file.
	fs.readFile('credentials.json', (err, content) => {
		if (err) return console.log('Error loading client secret file:', err);
		// Authorize a client with credentials, then call the Google Drive API.
		authorize(JSON.parse(content), listFiles);
	});

	/**
	 * Create an OAuth2 client with the given credentials, and then execute the
	 * given callback function.
	 * @param {Object} credentials The authorization client credentials.
	 * @param {function} callback The callback to call with the authorized client.
	 */
	function authorize(credentials, callback) {
		const {client_secret, client_id, redirect_uris} = credentials.installed;
		const oAuth2Client = new google.auth.OAuth2(
			client_id,
			client_secret,
			redirect_uris[0]
		);

		// Check if we have previously stored a token.
		fs.readFile(TOKEN_PATH, (err, token) => {
			if (err) return getAccessToken(oAuth2Client, callback);
			oAuth2Client.setCredentials(JSON.parse(token));
			callback(oAuth2Client);
		});
	}

	/**
	 * Get and store new token after prompting for user authorization, and then
	 * execute the given callback with the authorized OAuth2 client.
	 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
	 * @param {getEventsCallback} callback The callback for the authorized client.
	 */
	function getAccessToken(oAuth2Client, callback) {
		const authUrl = oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: SCOPES
		});
		console.log('Authorize this app by visiting this url:', authUrl);
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});
		rl.question('Enter the code from that page here: ', code => {
			rl.close();
			oAuth2Client.getToken(code, (err, token) => {
				if (err) return console.error('Error retrieving access token', err);
				oAuth2Client.setCredentials(token);
				// Store the token to disk for later program executions
				fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
					if (err) console.error(err);
					// console.log('Token stored to', TOKEN_PATH);
				});
				callback(oAuth2Client);
			});
		});
	}

	/**
	 * Lists the names and IDs of up to 10 files.
	 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
	 */
	function listFiles(a) {
		auth = a;
		// console.log('auth', auth);
		const drive = google.drive({version: 'v3', auth});
		drive.files.list(
			{
				pageSize: 10,
				fields: 'nextPageToken, files(id, name, mimeType, size)'
			},
			(err, res) => {
				if (err) return console.log('The API returned an error: ' + err);
				const files = res.data.files;
				if (files.length) {
					console.log('Files:');
					files.map(file => {
						console.log(`${file.name} (${file.id})`);
					});
				} else {
					console.log('No files found.');
				}
			}
		);
	}
};

GOOGLEAPI.prototype.listGoogleDrive = function(callback) {
	console.log('listGoogleDrive');
	const drive = google.drive({version: 'v3', auth});
	drive.files.list(
		{
			pageSize: 10,
			fields: 'nextPageToken, files(id, name, mimeType, size)'
		},
		(err, res) => {
			if (err) return console.log('The API returned an error: ' + err);
			var files = res.data.files;
			// console.log('Files:', files);
			files.map(f => {
				f.filename = f.name;
				return f;
			});
			files = files.filter(f => !f.mimeType.includes('vnd.google-apps.document'))
			callback(files);
		}
	);
};

GOOGLEAPI.prototype.uploadGoogleDrive = function(
	file_name,
	type,
	file_url,
	callback
) {
	const drive = google.drive({version: 'v3', auth});
	var fileMetadata = {
		name: file_name
	};
	var media = {
		mimeType: type,
		body: fs.createReadStream(file_url)
	};
	console.log('uploadGoogleDrive...');
	drive.files.create(
		{
			resource: fileMetadata,
			media: media,
			fields: 'id'
		},
		function(err, file) {
			if (err) {
				// Handle error
				console.error('uploadGoogleDrive', err);
			} else {
				console.log('uploadGoogleDrive => file', file);
				callback(file.data.id);
			}
		}
	);
};

GOOGLEAPI.prototype.downloadGoogleDrive = function(file, callback) {
	console.log('downloadGoogleDrive => file', file);
	let drive = google.drive({version: 'v3', auth});
	let file_url = 'files\\' + file.filename;
	var dest = fs.createWriteStream(file_url);
	drive.files.get(
		{fileId: file.id, alt: 'media'},
		{responseType: 'stream'},
		function(err, res) {
			if (err) console.error('drive.files.get', err);
			res.data
				.on('end', () => {
					console.log('Done');
					callback(file_url);
				})
				.on('error', err => {
					console.log('Error', err);
				})
				.pipe(dest);
		}
	);
};

module.exports = new GOOGLEAPI();
