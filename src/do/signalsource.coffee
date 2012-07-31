DO.signalsource = (settings, callback) ->

  settings.log "init signalsource"
  exchangeName = settings.kaazing.exchange.exchange
  channel = null

  source =
    subscribe: (callback) ->
      channel.onmessage = callback

    publish: (signal, text) ->
      body = new ByteBuffer()
      body.putString text, Charset.UTF8
      body.flip()
      headers = {}
      channel.publishBasic body, headers, exchangeName, signal, false, false

  onConnect = (event) ->
    settings.log "amqp connection opened ok"
    channel = amqp.openChannel onChannel

  onChannel= (event) ->
    settings.log "amqp channel opened ok"
    channel.onerror = onError
    channel.declareExchange( settings.kaazing.exchange, onExchange )

  onExchange = (event) ->
    settings.log "amqp exchange '#{exchangeName}' declared ok"
    channel.declareQueue(settings.kaazing.queue, onQueue )

  onQueue = (event) ->
    settings.log "amqp queue '#{settings.kaazing.queue.queue}' declared ok"
    channel.bindQueue( settings.kaazing.bind, onBind )

  onBind = (event) ->
    settings.log "amqp bind ok"
    channel.consumeBasic( settings.kaazing.consume )
    callback source

  onError = (event) ->
    settings.log "ERROR: amqp says '#{event.message}'"

  amqp = new AmqpClient()
  amqp.addEventListener "close", -> settings.log("amqp connection closed")
  amqp.connect( settings.kaazing.connect,  onConnect )

