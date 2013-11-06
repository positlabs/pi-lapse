define(function (require, exports, module) {

	// main app container.
	// doesn't do anything except serve as a receptacle for other views.

	var Backbone = require("backbone");
	var app = require("app");

	var View = Backbone.View.extend({

		el: "#main",
		template: 'main',
		initialize: function () {
			console.log("View."+"initialize()", arguments);
		},
		afterRender: function () {
			console.log("View."+"afterRender()", arguments);
		},
		serialize: function () {
			return _.extend({}, app.copy);
		}

	});

	return View;
});