timer = 0

buildSignalGraph = ( settings, j, source) ->

  clearInterval timer if timer isnt 0
  timer = 0

  journal = j.journal
  dots = j.dots
  log = settings.log
  cluster = settings.cluster

  log "reading #{cluster} from journal"

  chart = d3.select("#chart")
  width = chart.attr( "width" )
  height = chart.attr( "height" )
  m = [20, 120, 20, 120]
  w = width - m[1] - m[3]
  h = height - m[0] - m[2]
  maxDisplayed = 50
  intervalMillis = 2000

  translate = (x,y) -> "translate(" + x + "," + y + ")"

  tree = d3.layout.tree()
    .size([h, w])
    .children( (d) -> d.values )

  diagonal = d3.svg.diagonal()
    .projection( (d) -> [d.y, d.x] )

  maxTextLen = 20
  shorten = (text) ->
    if (text.length < maxTextLen + 1)
      text
    else
      text[0..7] + "..." +  text.slice(-8)

  update = ( queue ) ->
    chart
      .selectAll("svg")
      .remove()

    svg = chart
      .append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", translate(m[3], m[0]) )

    journal.unshift entry for entry in queue
    maxEntries = Math.min( maxDisplayed, journal.length )
    entries = []
    entries.push(journal[i]) for i in [0...maxEntries]

    nest = d3.nest()
      .key( (d) -> "Tenant " + d.DOTMsg.Header.TenantId + " / User " +  d.DOTMsg.Header.UserId)
      .sortKeys( d3.ascending )
      .key( (d) -> dots[d.DOTMsg.Header.DefinitionId]?[0]?.Name || "Unknown DOT" )
      .sortKeys( d3.ascending )
      .key( (d) -> "Instance " + d.DOTMsg.Header.InstanceId )
      .sortKeys( d3.ascending )
      .key( (d) -> shorten d.Signal )
        .entries( entries )

    data = { key: cluster, values: nest }
    data.x0 = h / 2
    data.y0 = 0

    nodes = tree.nodes data

    link = svg.selectAll("path.link")
      .data(tree.links(nodes))

    link.enter().append("path")
      .attr("class", "link")
      .attr("d", diagonal)

    link.filter( (d) -> d.target.isNew? )
      .style("stroke", "blue" );

    node = svg.selectAll("g.node")
      .data(nodes)

    node.enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) -> translate(d.y,d.x) )

    node.append("circle")
      .attr("r", 4.5 )

    text = node
      .append( "text" )
        .attr("dx", (d) -> if d.children? then -8 else 8)
        .attr("dy", 3)
        .attr("text-anchor", (d) -> if d.children? then "end" else "start" )
        .attr( "class", (d) -> if d.key?.slice(-6) is ".ERROR" then "error" )
      .text( (d) -> if d.key? then d.key else formatDate( d.PublishTime ) )

    text.filter( (d) -> not d.key )
      .on( "click", (d) -> alert d.Signal + ":\n " + d.DOTMsg.Payload )
      .append("title")
      .text( (d) -> d.Signal + ":\n " + d.DOTMsg.Payload )

    node.filter( (d) -> d.isNew )
      .attr("class", "new");

  source.subscribe( (event) ->
    hs = event.headers.headers
    ptime = h.value for h in hs when h.key is "SubmitTime"
    signal = {
      Signal: event.args.routingKey
      DOTMsg: JSON.parse( event.body.getString(Charset.UTF8) )
      PublishTime: new Date(ptime)
      isNew: true
    }
    events.push(signal)
    hdr = signal.DOTMsg.Header
    log "rcv #{signal.Signal} from #{hdr.TenantId}/#{hdr.UserId} instance #{hdr.InstanceId}"  + " at " + signal.PublishTime
  )

  events = []
  timer = setInterval ( ->
    update(events)
    events = []
    ), intervalMillis

formatDate = (t) ->
  date = if t instanceof Date then t else new Date( t.$date )
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


