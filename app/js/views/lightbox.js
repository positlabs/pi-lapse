define(function (require, exports, module) {

	var Backbone = require("backbone");
	var _ = require("underscore");
	var $ = require("jquery");

	var LightboxModel = Backbone.Model.extend({
		cursor: 0,
		album: ""
	});

	var Lightbox = Backbone.View.extend({

		model: new LightboxModel(),
		id: "lightbox",
		template: "lightbox",
		className: "view",
		events: {
			"click .left": "onClickLeft",
			"click .right": "onClickRight",
			"click": "onClick"
		},
		initialize: function () {
			console.log("lightbox." + "initialize()", this);
			this.model.on("change:cursor", this.onCursorChange);
		},
		onCursorChange: function () {
			console.log("lightbox." + "onCursorChange()", arguments);
		},
		onClickLeft: function (e) {
			e.stopPropagation();
			var cursor = this.model.get("cursor");
			cursor == this.model.get('album').values().length - 1 ? this.model.set("cursor", 0) : this.model.set("cursor", cursor + 1);
			this.render();
		},
		onClickRight: function (e) {
			e.stopPropagation();
			var cursor = this.model.get("cursor");
			cursor == 0 ? this.model.set("cursor", this.model.get("album").values().length - 1) : this.model.set("cursor", cursor-1);
			this.render();
		},
		onClick: function () {
			this.remove();
		},
		serialize: function () {
			var obj = {
				image: this.model.get('album').get(this.model.get('cursor'))
			};
			return obj;

		}

	});

	return Lightbox;

});
