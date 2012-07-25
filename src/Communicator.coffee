class Communicator

  semver: "0.0.1"

  constructor: (@log, @onmessage = @onMessageDefault) ->
    @amqp = new AmqpClient
    @amqp.addEventListener "close", =>
      @log "DISCONNECTED"
    @portIndex = 0

  connect: ( @config, credentials, @onconnected) ->
    @amqp.connect config.url, config.virtualhost, credentials, "0-9-1" ,
      (evt) =>
        @log.write "Connected"
        @log.writeLine()
        @channel = @amqp.openChannel @openHandler, @errorHandler

  disconnect:  =>
    @amqp.disconnect()

  publish:  ( exchange, text, routingKey ) =>
    body = new ByteBuffer()
    body.putString text, Charset.UTF8
    body.flip()
    headers = {}
    @channel.publishBasic body, headers, exchange, routingKey, false, false

  sendSignal: (msg, signal) =>
    @publish @config.signalX, msg, signal

  errorHandler: (evt) =>
    @log.write "Error: " + evt.type
    @log.writeLine()

  onMessageDefault: (msg) =>
    @log.write "#{msg.args.routingKey}> #{msg.body.getString( Charset.UTF8 )}"
    @log.writeLine()

  openHandler: (evt) =>
    @log.write "open '#{@config.signalX}' channel ok"
    @log.writeLine()
    channel.declareExchange exchange, 'topic', false, false, false
    channel.addEventListener "declareexchange", =>
      @log.write "declare '#{exchange}' exchange ok"
      @log.writeLine()
    channel.addEventListener "close", =>
      @log.write "close '#{exchange}' channel ok"
      @log.writeLine()
  @doBind()

  serverChannelOpenHandler: (evt) =>
    @channelOpenHandler evt.channel, @config.serverX, 'topic'

  listen: (channel, event, label) =>
    channel.addEventListener event, =>
      @log.write "#{event} for '#{label}' ok"
      @log.writeLine()

  doBind: =>

    @channel.onmessage = @onmessage
    eQName = "exposureQ#{new Date().getTime()}"

    passive = durable = autoDelete = noWait = exclusive = noLocal = noAck = true
    qArgs = null
    tag = ""

    @channel.declareQueue(eQName, not passive, not durable, exclusive, autoDelete, not noWait)
      .bindQueue(eQName, @config.signalX, "#", not noWait)
      .consumeBasic eQName, tag, not noLocal, noAck, noWait, not exclusive
    @onconnected?()

root = exports ? window
root.Communicator = Communicator

