// https://npmjs.org/package/watchr
var watchr = require('watchr');
var ftp = require('./upload');

ftp.login();

watchr.watch({
	paths:["output/"],
	listeners: {
        log: function(logLevel){
            // console.log('a log message occured:', arguments);
        },
        error: function(err){
            console.log('an error occured:', err);
        },
        watching: function(err,watcherInstance,isWatching){
            // if (err) {
                // console.log("watching the path " + watcherInstance.path + " failed with error", err);
            // } else {
                // console.log("watching the path " + watcherInstance.path + " completed");
            // }
        },
        change: function(changeType, filePath, fileCurrentStat, filePreviousStat){
            // console.log('a change event occured:',changeType, filePath);
            if(changeType == "create"){
    	       	ftp.upload(filePath);
	        }
        }
    },
    next: function(err,watchers){
        if (err) {
            return console.log("watching everything failed with error", err);
        } else {
            // console.log('watching everything completed');
        }
    }
});