semver: "0.0.1"            # Semantic versioning - semver.org
needReconnect = true

$ ->
  log = new Log $("#console")

  connectToMongo = (callback) ->
    return unless needReconnect
    scheme = "http://"
    url = scheme + $("#" + ids.mongoose).val() + "/_connect"
    data = "server=" + $("#" + ids.journal).val()
    $.post( url, data, callback )
      .error( () ->
        log.writeLine( "error connecting to Journal via mongoose" ) )
    log.writeLine "Connecting to Journal ..."

  onMongo = (d) ->
    if d.ok is 1
      log.writeLine 'done'
      buildSignalGraph()
      needReconnect = false
    else
      log.writeLine "error: #{d.ok}"

  connectToAmqp = (callback) ->
    comm = new Communicator log, messageHandler
    data = "server=" + $("#" + ids.journal).val()
    $.post( url, data, callback )
    log.write "Connecting to AMQP via Kaazing ..."

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
    .on( "change", (d) -> needReconnect = true )
#    .classed( "serverSetting", true )

  twiddleText = "Twiddle (with care)"
  resendText = "Click on a signal to resend"

  # d3.select(".serverSetting").on "change", ->
  #   needReconnect = true

  d3.select("#knobsRef").on "click", ->
    $("#page").text twiddleText
    d3.select(".gallery").classed "invisible", true
    d3.select(".knobs").classed "invisible", false

  d3.select("#mainRef").on "click", ->
    $("#page").text resendText
    d3.select(".gallery").classed "invisible", false
    d3.select(".knobs").classed "invisible", true
    connectToMongo onMongo

  connectToMongo onMongo
#  connectToAmqp onMongo


# log = new Log( $(".console") )

# messageHandler = (m) ->
#   topic = m.args.routingKey
#   body = m.body.getString(Charset.UTF8)
#   switch m.args.exchange
#     when config.signalX
#       signalDispatcher controller, topic, body
#     when config.serverX
#       serverDispatcher controller, topic, body

# controller = new RakController log
# comm = new Communicator log, messageHandler

# comm.connect config, config.credentials, =>
#   controller.init comm

