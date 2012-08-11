DO.amqp = null

DO.signalsource = (settings, callback) ->

  log = settings.log
  exchange = settings.kaazing.exchange.exchange
  channel = null

  source =
    subscribe: (callback) ->
      channel.onmessage = callback

    publish: (signal, text) ->
      body = new ByteBuffer()
      body.putString text, Charset.UTF8
      body.flip()
      headers = {}
      channel.publishBasic body, headers, exchange, signal, false, false

  onConnect = (event) ->
    log "amqp connection opened ok"
    channel = DO.amqp.openChannel onChannel

  onChannel= (event) ->
    log "amqp channel opened ok"
    channel.onerror = DO.amqp.onerror
    channel.onclose = -> log "amqp channel closed"
    channel.declareExchange( settings.kaazing.exchange, onExchange )

  onExchange = (event) ->
    log "amqp exchange '#{exchange}' declared ok"
    queue = "vizdo" + ~~ (Math.random() * 10000000)
    settings.kaazing.queue.queue =
      settings.kaazing.bind.queue =
      settings.kaazing.consume.queue = queue
    channel.declareQueue(settings.kaazing.queue, onQueue )

  onQueue = (event) ->
    log "amqp queue '#{settings.kaazing.queue.queue}' declared ok"
    channel.bindQueue( settings.kaazing.bind, onBind )

  onBind = (event) ->
    log "amqp bind ok"
    channel.consumeBasic( settings.kaazing.consume )
    callback source

  DO.amqp?.disconnect()
  DO.amqp = new AmqpClient()
  DO.amqp.onclose =  -> log("amqp connection closed")
  DO.amqp.onerror =  (event) -> log("ERROR from amqp" )
  DO.amqp.connect(settings.kaazing.connect,  onConnect )

