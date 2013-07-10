/*
	model/task.js
	Your api_key is: 12614411f8275adf7f290ed73088dfae
	Your shared secret is: 65a231ec9c93e197
*/

var app = app || {};

// priority, due, name, list, completed

app.Task = Backbone.Model.extend({

	// defaults
	defaults: {
		completed: false
	}

});