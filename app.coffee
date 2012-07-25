express = require('express')
port = process.argv[2] || 3003
app = express.createServer()

app.configure ->
  app.use express.static(__dirname + '/public')


app.configure 'development', ->
  app.use express.errorHandler { dumpExceptions: true, showStack: true }

app.get '/', (req, res) ->
  res.render 'index'

app.listen(port)
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env)


