DO.log = (target) ->
  maxLines = 500
  lineNo = 0

  (msg) ->
    target.append("pre").text( msg )
    if lineNo++ > maxLines
      target.html ''
      lineNo = 0
