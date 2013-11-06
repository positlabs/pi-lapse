define(function (require, exports, module) {

	var Backbone = require("backbone");
	var _ = require("underscore");
	var $ = require("jquery");

	var LightBox = require("views/lightbox");

	var IndexModel = Backbone.Model.extend({
		url: "imageList.php",
		parse: function (result) {
			console.log("\nparse", result);
			var images = [];
			for (var i = 0, maxi = result.images.length; i < maxi; i++) {
				var date = result.images[i].split("/").pop().split(".")[0];
				var yyyy = date.slice(0, 4);
				var mm = date.slice(4, 6);
				var dd = date.slice(6, 8);
				var hour = date.slice(8, 10);
				var minute = date.slice(10, 12);
				var second = date.slice(12, 14);

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
			setInterval(this.checkForMore, 10000);
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
