var arc = require('@architect/functions')

function route(req, res) {
  res({
    json: {
      "arc-lambda": {
        "name": "🌩 architect",
        "description": "Event driven programming with cloud functions can be tricky to set up and maintain. architect offers a simple plaintext manifest and npm script based workflows for provisioning, deploying, orchestrating, and working offline with cloud infrastructure.<br><br>This demo uses the <a href='http://todomvc.com/examples/vanillajs/'>VanillaJS example</a> from the well-known <a href='http://todomvc.com/'>todoMVC</a> project and adds persistent database storage of the todo items in DynamoDB via AWS Lambda.",
        "homepage": "arc.codes"
      },
      "templates": {
        "todomvc": "<header> <h3><%= name %></h3> <span class=\"source-links\"> <% if (typeof examples !== 'undefined') { %> <% examples.forEach(function (example) { %> <h5><%= example.name %></h5> <% if (!location.href.match(example.url + '/')) { %> <a class=\"demo-link\" data-type=\"<%= example.type === 'backend' ? 'external' : 'local' %>\" href=\"<%= example.url %>\">Demo</a>, <% } if (example.type === 'backend') { %><a href=\"<%= example.source_url %>\"><% } else { %><a href=\"https://github.com/tastejs/todomvc/tree/gh-pages/<%= example.source_url ? example.source_url : example.url %>\"><% } %>Source</a> <% }); %> <% } %> </span> </header> <hr> <blockquote class=\"quote speech-bubble\"> <p><%= description %></p> <footer> <a href=\"http://<%= homepage %>\"><%= name %></a> </footer> </blockquote> <% if (typeof link_groups !== 'undefined') { %> <hr> <% link_groups.forEach(function (link_group) { %> <h4><%= link_group.heading %></h4> <ul> <% link_group.links.forEach(function (link) { %> <li> <a href=\"<%= link.url %>\"><%= link.name %></a> </li> <% }); %> </ul> <% }); %> <% } %>"
      }
    }
  })
}

exports.handler = arc.json.get(route)
