open index.ejs
run nodemon solution1
run nodemone solution2
db.query command consist [sql, params, const/variable]

how to add endpoints post
1. add app.post
2. add req.body as const , value in req.body is following input.name from index.ejs
3. make sure db.end(); should deleted before running
4. use res.redirect() or res.render()
// res.redirect method sends a response to the client instructing it to redirect to a different URL
// res.render method renders a template with the given data and sends the rendered HTML to the client
// first key is always from ejs file