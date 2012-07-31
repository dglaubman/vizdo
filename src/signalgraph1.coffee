buildSignalGraph = (journal, source) ->

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

  nest = d3.nest()
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
