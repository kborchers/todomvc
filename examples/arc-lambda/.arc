@app
todoMVC-arc-lambda

@html
get /                           # main app page
post /todo/:storeID/new         # create todo in dynamo
post /todo/:storeID/update      # update todo in dynamo
post /todo/:storeID/delete      # delete todo from dynamo

@json
get /todos/:storeID             # get all user todos from dynamo
get /learn                      # get todoMVC style learn.json for more info

@tables
todos
  storeID *String
  id **Number
