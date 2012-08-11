knobs = (settings) ->

  # chart dimensions
  chart = d3.select("#chart2")
  width = chart.attr( "width" )
  height = chart.attr( "height" )
  m = [20, 120, 20, 120]
  w = width - m[1] - m[3]
  h = height - m[0] - m[2]

  chart
    .selectAll("svg")
    .remove()

  svg = chart
    .append("svg")
      .attr("width", width)
      .attr("height", height)

  # Add the clipping path
  svg.append("clipPath").attr("id", "clipper")
    .append("rect")
    .attr('id', 'clip-rect')

  translate = (x,y) -> "translate(" + x + "," + y + ")"
  graphics = svg
    .append("g")
      .attr("transform", translate(m[3], m[0]) )

  # set the clipping path
  animGroup = graphics.append("g")
    .attr("clip-path", "url(#clipper)")

  duration = 750

  tree = d3.layout.tree()
    .size([h, w])

  diagonal = d3.svg.diagonal()
    .projection( (d) -> [d.y, d.x] )

  # given an object, recursively accumulates array of { key, [children] }
  o2a = (acc, map) ->
    if typeof map is "object"
      for key, value of map
        if typeof value isnt "function"
          acc.push { key, children: o2a( [], value ) }
    else
      acc.push
        leaf: map
        setter: settings
    acc

  data = { key: settings.cluster, children: o2a( [], settings )}
  data.x0 = h / 2
  data.y0 = 0

  nodes = tree.nodes data

  link = graphics.selectAll("path.link")
    .data(tree.links(nodes))
    .enter().append("path")
      .attr("class", "link")
      .attr("d", diagonal);

  node = graphics.selectAll("g.node")
    .data(nodes)
    .enter()
      .append("g")
        .attr("class", "node")
        .attr("transform", (d) -> translate(d.y,d.x) )

  node.append("circle")
    .attr("r", 4.5 )

  text = node
    .append( "text" )
      .attr("dx", (d) -> if d.children? then -8 else 8)
      .attr("dy", 3)
      .attr("text-anchor", (d) -> if d.leaf? then "start" else "end" )
      .attr("font-style", (d) -> if d.leaf? then "italic")
      .text( (d) -> if d.key? then d.key else d.leaf )
      .on( "click", (d) ->
        if d.leaf?
          key = d.parent.key
          name = prompt( "Enter new value for '#{key}'", d.leaf )
          if name?
            ancestors = []
            parent = d.parent
            while parent?
              ancestors.push parent.key
              parent = parent.parent
            setter = d.setter
            for path in ancestors.reverse().slice(1,-1)
              setter = setter[path]
            setter[key] = this.textContent = d.leaf = name
        )


