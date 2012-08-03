DO.journal = (settings, callback) ->

  onconnect = (reply) ->
    if reply.ok isnt 1
      return settings.log "mongoose says: " + reply.errmsg

    settings.log 'connected'

    req = settings.mongoose.baseUri +
      "/DotDefinition/_find?name=" +
      settings.cluster

    d3.json req, (reply) ->
      if reply.ok isnt 1
        return settings.log "mongoose says: " + reply.errmsg

      dots = d3.nest()
        .key( (d) -> d.Id )
        .map( reply.results )

      req = settings.mongoose.baseUri +
          "/DOJournal/_find" +
          "?name=#{settings.cluster}" +
          "&sort={ \"PublishTime\" : -1 }" +
          "&limit=#{settings.mongoose.batchsize}" +
          "&batch_size=#{settings.mongoose.batchsize}" +
          "&skip=#{settings.mongoose.skip}"

      d3.json req, (reply) ->
        if reply.ok isnt 1
          return settings.log "mongoose says: " + reply.errmsg
        callback( { dots: dots, journal: reply.results } )

  url = settings.mongoose.baseUri + "/_connect"
  server = "server=#{settings.journal.host}&name=#{settings.cluster}"
  $.post(url, server, onconnect )
    .error () -> settings.log "error connecting to journal via mongoose"
  settings.log "connecting to Journal at #{settings.journal.host} ..."
