post = (url, str, callback, error) ->
  req = new XMLHttpRequest
  req.open "POST", url, true
  req.setRequestHeader 'Content-Type', 'application/x-www-form-urlencoded'
  req.onreadystatechange = ->
    return 0 unless req.readyState is 4
    s = req.status
    if (s >= 200 and s < 300 or s is 304)
  	  callback req.response
    else error req.response
  req.send str
