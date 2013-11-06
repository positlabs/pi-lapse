define(function (require, exports, module) {

	var Backbone = require("backbone");
	var _ = require("underscore");
	var $ = require("jquery");

	var LightBox = require("views/lightbox");

	var IndexModel = Backbone.Model.extend({
//		url: "http://josh-dev.toolofnadrive.com/pi-lapse/imageList.php",
		url: "imageList.php",
		parse: function (result) {
			console.log("\nparse", result);
			var images = [];
			for (var i = 0, maxi = result.images.length; i < maxi; i++) {
				var date = result.images[i].split("/").pop().split(".")[0];
				var endIndex = date.length;
				var yyyy = date.slice(endIndex-14, endIndex-10);
				var mm = date.slice(endIndex-10, endIndex-8);
				var dd = date.slice(endIndex-8, endIndex-6);
				var hour = date.slice(endIndex-6, endIndex-4);
				var minute = date.slice(endIndex-4, endIndex-2);
				var second = date.slice(endIndex-2, endIndex);

				images.unshift({
					large: result.images[i],
					medium: result.medium[i],
					small: result.thumbs[i],
					date: {
						yyyy: yyyy,
						mm: mm,
						dd: dd,
						hour: hour,
						minute: minute,
						second: second
					}
				});
			}

			for (var i = 0, maxi = images.length; i < maxi; i++) {
				images[i].index = i;
			}

			setTimeout(this.checkForMore, 15000);

			console.log("images", images);
			return images;
		}
	});

	var index = Backbone.View.extend({
		id: "index",
		model: new IndexModel(),
		template: "index",
		className: "view",
		events: {
			"click .thumbnail": "clickThumb"
		},
		initialize: function () {
			console.log("index." + "initialize()", arguments);
			this.listenTo(this.model, "change", this.render);
			this.checkForMore = _.bind(this.checkForMore, this);
			this.checkForMore();
		},
		afterRender: function () {
		},
		serialize: function () {
			return this.model.attributes;
		},
		checkForMore: function () {
			this.model.fetch();
		},
		clickThumb: function (e) {

			// TODO - trigger this with a routing event
			var lb = new LightBox();
			lb.model.set("album", this.model);
			lb.model.set("cursor", e.currentTarget.getAttribute("data-index"));
			this.insertView(lb);
			lb.render();
		}

	});

	return index;

});
