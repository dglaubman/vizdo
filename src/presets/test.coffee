presets.test =
  cluster: "test"

  journal:
    host: "ec2-184-73-9-249.compute-1.amazonaws.com:27017"

  amqp:
    host: "cadt0734.rms.com:55672"

  kaazing:

    connect:
      url: "ws://cadt0734.rms.com:8001/amqp"
      credentials:
        username: "guest"
        password: "guest"
      virtualHost: "v0.1.1"

    exchange:
      exchange: 'signalX'
      type: 'topic'
      passive: false
      durable: false
      noWait: false
      desc: "Config used by declareExchage"

    queue:
      passive: false
      durable: false
      exclusive: false
      autoDelete: true
      noWait: false
      desc: "Config used by declareQueue"

    bind:
      exchange: "signalX"
      routingKey: "#"
      noWait: false
      desc: "Config used by doBind"

    consume:
      consumerTag: "vizdo"
      noLocal: false
      noAck: true
      exclusive: false
      noWait: false
      desc: "Config used by doBind"

  mongoose:
    baseUri: "http://cadt0734.rms.com:27080/DODatabase"
    skip: 0
    limit: 30
    batchsize: 40
