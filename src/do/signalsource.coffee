DO.signalsource = (settings, callback) ->

  amqp = new AmqpClient()
  log = settings.log
  xname = settings.kaazing.exchange.exchange
  channel = null

  onBind = (event) ->
    log "amqp bind ok"
    callback(
      subscribe: (msgHandler) ->
        channel.onmessage = msgHandler
        channel.consumeBasic( settings.kaazing.consume)

      publish: (signal, text) ->
        body = new ByteBuffer()
        body.putString text, Charset.UTF8
        body.flip()
        headers = {}
        channel.publishBasic body, headers, xname, signal, false, false
      )

  onExchange = (event) ->
    log "amqp exchange '#{xname}' declared ok"
    queue = "vizdo" + ~~ (Math.random() * 10000000)
    settings.kaazing.queue.queue =
      settings.kaazing.bind.queue =
      settings.kaazing.consume.queue = queue
    channel.declareQueue(settings.kaazing.queue, onQueue )

  onQueue = (event) ->
    log "amqp queue '#{settings.kaazing.queue.queue}' declared ok"
    channel.bindQueue( settings.kaazing.bind, onBind )

  onChannel= (event) ->
    log "amqp channel opened ok"
    channel.declareExchange( settings.kaazing.exchange, onExchange )

  onConnect = (event) ->
    log "amqp connection opened ok"
    channel = amqp.openChannel onChannel

  amqp.connect(settings.kaazing.connect,  onConnect )

