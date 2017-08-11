/*global app, $on */
(function () {
	'use strict';

	/**
	 * Sets up a brand new Todo list.
	 *
	 * @param {string} name The name of your new to do list.
	 */
	function Todo(name) {
		this.name = name;
		this.storage = new app.Store(name);
		this.model = new app.Model(this.storage);
		this.template = new app.Template();
		this.view = new app.View(this.template);
		this.controller = new app.Controller(this.model, this.view);
	}

	var todo = new Todo('todos-arc-lambda');
	// Get initial data from Dynamo
	var toFetch = localStorage[todo.name+'-storeID'] || 0;
	var path = document.location.pathname === '/' ? '' : document.location.pathname;
	fetch(path + '/todos/' + toFetch)
		.then(function(response) { return response.json(); })
		.then(function(d) {
			if (d.newID) {
				localStorage[todo.name+'-storeID'] = d.newID;
			} else {
				d.forEach(function(item) {
					delete item.storeID;
					todo.controller.addDBItem(item);
				});
			}
		});

	function setView() {
		todo.controller.setView(document.location.hash);
	}
	$on(window, 'load', setView);
	$on(window, 'hashchange', setView);
})();
