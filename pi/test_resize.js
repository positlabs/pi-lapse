var gmagic = require('gm');
var gm = gmagic.subClass({imageMagick: true});

gm("output/20131101165713.jpg").resize(1080).write("output/20131101165713_.jpg", function (e) {
	console.log(e)
});


