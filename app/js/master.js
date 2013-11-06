// entry point for requirejs
define(["require_config"], function () {

	require([

		"app",
		"underscore",
		"jquery",
		"backbone",
		"jade",
		"jade_jst",
		"backbone.layoutmanager"

	], function (app, _, $, Backbone, jade) {

		window.jade = jade;
		window._ = _;
		window.$ = $;
		window.Backbone = Backbone;

		Backbone.Layout.configure({
			manage: true,
			fetchTemplate: function (path) {

				console.log("path",path);
				return JST[path];
			}
		});

		app.initialize();

	})
});