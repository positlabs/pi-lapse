define(function (require, exports, module) {

	var Backbone = require("backbone");

	var IndexModel = Backbone.Model.extend({
		url: "imageList.php",
		parse:function(result){
			return result.images;
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
			app.index = this;
		},
		beforeRender: function () {
			this.model.fetch();
		},
		render:function(){
			this.el.innerHTML = JST.index(this.model.attributes)
		},
		afterRender: function () {
		},
		serialize:function(){
			return this.model.attributes;
		}

	});

	return index;

});
