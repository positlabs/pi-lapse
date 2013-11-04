define(function (require, exports, module) {

	var Backbone = require("backbone");
	var _ = require("underscore");

	var IndexModel = Backbone.Model.extend({
		url: "imageList.php",
		parse: function (result) {
//			console.log("\nparse",result);
			var images = [];
			for (var i = 0, maxi = result.images.length; i < maxi; i++) {
				images.push({
					large: result.images[i],
					small: result.thumbs[i]
				})
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
		},
		initialize: function () {
			this.listenTo(this.model, "change", this.render);
			this.checkForMore = _.bind(this.checkForMore, this);
			setInterval(this.checkForMore, 5000);
			this.checkForMore();
		},
		serialize: function () {
			return this.model.attributes;
		},
		checkForMore: function () {
			this.model.fetch();
		}

	});

	return index;

});
