define(function (require, exports, module) {

	var Backbone = require("backbone");
	var _ = require("underscore");
	var $ = require("jquery");

	var lightbox = Backbone.View.extend({
		cursor: 0,

		id: "lightbox",
		template: "lightbox",
		className: "view",
		events: {
			"click .left": "onClickLeft",
			"click .right": "onClickRight",
			"click": "onClick"
		},
		onClickLeft: function (e) {
			e.stopPropagation();
			this.cursor == this.model.values().length - 1 ? this.cursor = 0: this.cursor++;
			this.render();
		},
		onClickRight: function (e) {
			e.stopPropagation();
			this.cursor == 0 ? this.cursor = this.model.values().length-1 : this.cursor--;
			this.render();
		},
		onClick:function(){
			this.remove();
		},
		serialize:function(){
			return this.model.get(this.cursor);
		}

	});

	return lightbox;

});
