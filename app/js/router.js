define(function (require, exports, module) {

    require('app');

	var Index = require('views/Index');

	// Defining the application router, you can attach sub routers here.
	var Router = Backbone.Router.extend({
		routes: {
			"": "index",
			'*path': 'unknown'
		},
		initialize:function(){
		},
		unknown: function(route){
			console.warn("Router."+"unknown()", route);

			this.navigate("", {
				trigger: true
			});
		},
		index: function () {
			var indexView = new Index();
			app.main.insertView(indexView);
//			indexView.render();
		}

	});

	return Router;

}); 
