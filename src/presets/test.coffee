presets.test =
  cluster: "test"

  journal:
    host: "ec2-184-73-9-249.compute-1.amazonaws.com:27017"

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
      queue: 'dglaubman001'
      passive: false
      durable: false
      exclusive: true
      autoDelete: true
      noWait: false
      desc: "Config used by declareQueue"

    bind:
      queue: "dglaubman001"
      exchange: "signalX"
      routingKey: "#"
      noWait: false
      desc: "Config used by doBind"

    consume:
      queue: "dglaubman001"
      consumerTag: "vizdo"
      noLocal: false
      noAck: true
      exclusive: false
      noWait: true
      desc: "Config used by doBind"

  mongoose:
    baseUri: "http://cadt0734.rms.com:27080/DODatabase"
    skip: 20
    limit: 30
    batchsize: 40
