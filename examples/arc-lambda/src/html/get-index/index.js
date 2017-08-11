var arc = require('@architect/functions');
var fs = require('fs');
var read = fs.readFileSync;
var join = require('path').join

function route(req, res) {
	var learnPath = '/';
	if (process.env.NODE_ENV !== 'testing') {
		if (req.path !== '/') {
			learnPath = process.env.NODE_ENV + req.path + '/';
		} else {
			learnPath = process.env.NODE_ENV + '/';
		}
	}

  var html = `<!doctype html>
  <html lang="en" data-framework="arc-lambda">
  	<head>
  		<meta charset="utf-8">
  		<title>arc-lambda • TodoMVC</title>
  		<style>${read(require.resolve('todomvc-common/base.css')).toString()}</style>
  		<style>${read(require.resolve('todomvc-app-css/index.css')).toString()}</style>
  	</head>
  	<body>
  		<section class="todoapp">
  			<header class="header">
					<h1>todos</h1>
					<span class="sync-message hidden">
						<h3>Your todos do not match the database. Would you like to use the todos from:</h3>
						<ul class="filters">
							<li><a href="#/sync-db">Server</a></li>
							<li><a href="#/sync-client">Your Device</a></li>
						</ul>
					</span>
  				<input class="new-todo" placeholder="What needs to be done?" autofocus>
  			</header>
  			<section class="main">
  				<input class="toggle-all" type="checkbox">
  				<label for="toggle-all">Mark all as complete</label>
  				<ul class="todo-list"></ul>
  			</section>
  			<footer class="footer">
  				<span class="todo-count"></span>
  				<ul class="filters">
  					<li>
  						<a href="#/" class="selected">All</a>
  					</li>
  					<li>
  						<a href="#/active">Active</a>
  					</li>
  					<li>
  						<a href="#/completed">Completed</a>
  					</li>
  				</ul>
  				<button class="clear-completed">Clear completed</button>
  			</footer>
  		</section>
  		<footer class="info">
  			<p>Double-click to edit a todo</p>
  			<p>Created by <a href="http://twitter.com/kborchers">Kris Borchers</a></p>
  			<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
			</footer>
			<script>${read(require.resolve('todomvc-common/base.js')).toString().replace(/learn\.json/, learnPath + 'learn')}</script>
      <script>${read(join(__dirname, 'client/helpers.js')).toString()}</script>
      <script>${read(join(__dirname, 'client/store.js')).toString()}</script>
      <script>${read(join(__dirname, 'client/model.js')).toString()}</script>
  		<script>${read(join(__dirname, 'client/template.js')).toString()}</script>
      <script>${read(join(__dirname, 'client/view.js')).toString()}</script>
      <script>${read(join(__dirname, 'client/controller.js')).toString()}</script>
      <script>${read(join(__dirname, 'client/app.js')).toString()}</script>
  	</body>
  </html>`;
  res({
    html: html
  });
}

exports.handler = arc.html.get(route);
