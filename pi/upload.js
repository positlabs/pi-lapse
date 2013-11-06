var fs = require("fs");
var path = require('path');
var JSFtp = require("jsftp"); // https://npmjs.org/package/jsftp
var http = require("http");

var toUpload = [];
var uploading = false;
var loggedIn = false;
var ftp;

/**
 username / passwords need to be stored in .ftppass
 {
	"key1": {
		"host": "yourhost.com",
		"remoteDir": "upload/to/directory/",
		"port": 21,
		"username": "theusername",
		"password": "thepassword"
	}
}
 */

var options = JSON.parse(fs.readFileSync('../.ftppass', 'utf8')).key1;

function login() {

	console.log("connecting to", options.host);
	ftp = new JSFtp(options);
	ftp.auth(options.username, options.password, function (e) {
		if (e) {
			console.log(e);
		} else {
			loggedIn = true;
			startUploading();
			console.log("loggged in!")
		}
	});
}

function upload(filepath) {
	console.log("\npushing file into upload queue", filepath);
	// we can only upload one file at a time, so push them into a queue
	toUpload.push(filepath);
	console.log("\tfiles in queue:", toUpload.length);
}

function startUploading() {
	setInterval(doUpload, 500);
}

function doUpload() {

	if (loggedIn && uploading == false && toUpload.length > 0) {

		uploading = true;

		var filepath = toUpload.shift();
		console.log("uploading", filepath);

		var remotePath = path.join(options.remoteDir, "output", path.basename(filepath));
		ftp.put(filepath, remotePath, function (hadError) {
			uploading = false;
			if (!hadError) {
				console.log(filepath, "transferred successfully!");
				hitThumbGenerator(filepath)
			} else {
				console.log("error:", hadError);
				toUpload.push(filepath);
			}
		});
	}
}

function hitThumbGenerator(filepath){
	var url = path.join(options.remoteHttp, "imageList.php") + "?p=" + filepath;
	$.get(url, function(e){
		console.log("e",e);
	});
}

exports.upload = upload;
exports.options = options;
exports.ftp = ftp;
exports.login = login;

