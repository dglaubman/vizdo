twiddleText = "Twiddle (with care)"
resendText = "Click on a leaf to resend signal"

d3.select("#knobsRef").on "click", ->
  d3.select("#page").text twiddleText
  d3.select(".gallery").classed "invisible", true
  d3.select(".knobs").classed "invisible", false

d3.select("#mainRef").on "click", ->
  $("#page").text resendText
  d3.select(".gallery").classed "invisible", false
  d3.select(".knobs").classed "invisible", true
  update()

knobs = d3.select( ".knobs" ).selectAll( "div" )
  .data( settings )
  .enter()
    .append( "div" )

knobs.append( "label" )
  .attr( "for", (d) -> d.id )
  .text( (d) -> d.label )

knobs.append( "input" )
  .attr( "type", "text" )
  .attr( "id",    (d) -> d.id )
  .attr( "value", (d) -> d.value )
  .attr( "size", (d) -> d.size)

