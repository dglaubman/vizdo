root = exports ? window

# Set up a LIFO log
class root.Log
  constructor: (@targ) ->
    @lines = 0
    @inMsg = false
    @msg = ''

  write: (message) ->
    if not inMsg
      inMsg = true
      @msg = ""
    @msg = @msg + message

  writeLine: (message) ->
    @write( message ) if message
    if @lines++  > Log.MaxLines then @clear()
    @targ.prepend( "<pre>#{@msg}</pre>" )

  clear: () ->
    @targ.html ''
    @lines = 0
    @msg = ''

  Log.MaxLines = 500