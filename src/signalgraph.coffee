root = exports ? window

root.buildSignalGraph = () ->

  chart = d3.select("#chart")
  width = chart.attr( "width" )
  height = chart.attr( "height" )
  m = [20, 120, 20, 120]
  w = width - m[1] - m[3]
  h = height - m[0] - m[2]

  translate = (x,y) -> "translate(" + x + "," + y + ")"
  tree = d3.layout.tree().size([h, w])
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

  # nest() expects array of values, tree() expects array of children
  values2Children = (tre) ->
    if tre.values?
      tre.children = tre.values
      values2Children child for child in tre.children
      tre.values = null

  maxTextLen = 20
  shorten = (text) ->
    if (text.length < maxTextLen + 1)
      text
    else
      text[0..9] + "..." +  text.slice(-8)

  toggleAll = (d) ->
    if (d.children)
      d.children.forEach(toggleAll)
      toggle(d)

  # Toggle children.
  toggle = (d) ->
    if d.children?
      d._children = d.children;
      d.children = null;
    else
      d.children = d._children;
      d._children = null;

  base = "http://" +
              $("#" + ids.mongoose).val()
  batchsize = $("#" + ids.batchsize).val()
  cluster =   $("#" + ids.cluster).val()
  skip =      $("#" + ids.skip).val()
  dotQuery = base + "/DotDefinition/_find"
  signalQuery = base + "/DOJournal/_find?" +
    "sort={ \"PublishTime\" : -1 }" +
    "&limit=#{batchsize}&batch_size=#{batchsize}&skip=#{skip}"

  d3.json (dotQuery), (dotNames) ->

    dotMap = d3.nest()
      .key( (d) -> d.Id )
      .map ( dotNames.results )

    d3.json (signalQuery), (journal) =>

      nest = d3.nest()
        .key( (d) -> dotMap[d.DOTMsg.Header.DefinitionId]?[0]?.Name || "Unknown DOT" )
        .key( (d) -> "Instance " + d.DOTMsg.Header.InstanceId )
        .key( (d) -> shorten d.Signal )
        .entries( journal.results )
      data = { key: cluster, values: nest }
      values2Children data
      data.x0 = h / 2
      data.y0 = 0

      nodes = tree.nodes( data )

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
        .attr("transform", (d) -> "translate(#{d.y},#{d.x})")

      node.append("circle")
        .attr("r", 4.5 )

      text = node
        .append( "text" )
        .attr("dx", (d) -> if d.children? then -8 else 8)
        .attr("dy", 3)
        .attr("text-anchor", (d) -> if d.children? then "end" else "start" )
        .text( (d) -> if d.key? then d.key else new Date( d.PublishTime.$date ).toISOString() )

