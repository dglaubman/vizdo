buildSignalGraph = ( settings, j, source) ->

  journal = j.journal
  dots = j.dots
  log = settings.log
  cluster = settings.cluster

  chart = d3.select("#chart")
  width = chart.attr( "width" )
  height = chart.attr( "height" )
  m = [20, 120, 20, 120]
  w = width - m[1] - m[3]
  h = height - m[0] - m[2]
  duration = 750

  translate = (x,y) -> "translate(" + x + "," + y + ")"

  tree = d3.layout.tree()
    .size([h, w])
    .children( (d) -> d.values )

  diagonal = d3.svg.diagonal()
    .projection( (d) -> [d.y, d.x] )

  chart
    .selectAll("svg")
    .remove()

  svg = chart
    .append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", translate(m[3], m[0]) )

  maxTextLen = 20
  shorten = (text) ->
    if (text.length < maxTextLen + 1)
      text
    else
      text[0..9] + "..." +  text.slice(-8)

  nest = d3.nest()
    .key( (d) -> dots[d.DOTMsg.Header.DefinitionId]?[0]?.Name || "Unknown DOT" )
    .key( (d) -> "Instance " + d.DOTMsg.Header.InstanceId )
    .key( (d) -> shorten d.Signal )
      .entries( journal )

  data = { key: cluster, values: nest }
  data.x0 = h / 2
  data.y0 = 0
  nodes = tree.nodes data

  link = svg.selectAll("path.link")
    .data(tree.links(nodes))
  .enter().append("path")
    .attr("class", "link")
    .attr("d", diagonal);

  node = svg.selectAll("g.node")
    .data(nodes)
  .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", (d) -> translate(d.y,d.x) )

  node.append("circle")
    .attr("r", 4.5 )

  formatDate = (t) ->
    date = new Date( t.$date )
    now = new Date()
    switch ~~( (now.getTime() -  date.getTime()) /  86400000)
      when 0
        d = date.toTimeString()
        d[0..8]
      when 1,2,3,4,5,6,7
        d = date.toTimeString()
        d[0..8] + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()
      else
        (date.Month() + 1) + "/" + date.getDate() + "/" + date.getFullYear()

  text = node
    .append( "text" )
      .attr("dx", (d) -> if d.children? then -8 else 8)
      .attr("dy", 3)
      .attr("text-anchor", (d) -> if d.children? then "end" else "start" )
      .attr( "class", (d) -> if d.key?.slice(-6) is ".ERROR" then "error" )
    .text( (d) -> if d.key? then d.key else formatDate( d.PublishTime ) )

  source.subscribe( (event) ->
    log "message from #{event.args.routingKey}: " + event.body.getString(Charset.UTF8) )

