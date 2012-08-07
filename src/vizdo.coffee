log = DO.log d3.select("#log")
cluster = d3.select("input[name=cluster]:checked").attr("value")

makeHref = (cluster) ->
  host = presets[cluster].amqp.host
  {username, password} = presets[cluster].kaazing.connect.credentials
  "http://" + username + ":" + password + "@" + host

d3.select("#knobsRef").on "click", ->
  d3.select("#page").text "Twiddle (with care). Click on a leaf to edit"
  d3.select(".gallery").classed "invisible", true
  d3.select(".knobs").classed "invisible", false
  knobs( presets[cluster] )

d3.select("#mainRef").on "click", ->
  d3.select("#page").text cluster
  d3.select(".gallery").classed "invisible", false
  d3.select(".knobs").classed "invisible", true
  refresh()

d3.selectAll("input[name=cluster]").on "change", ->
  cluster = this.value
  d3.select("#viewAMQP").attr "href", makeHref(cluster)
  d3.select("#page").text cluster
  refresh()

refresh = ->
  settings = presets[cluster]
  settings.log = log
  DO.journal( settings, (journal) ->
    DO.signalsource( settings, (source) ->
      buildSignalGraph( settings, journal, source )
    )
  )

d3.select("#viewAMQP").attr("href", makeHref(cluster))
d3.select("#page").text cluster
refresh()