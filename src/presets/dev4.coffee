presets.dev4 =
  cluster: "dev4"

  journal:
    host: "ec2-54-225-26-11.compute-1.amazonaws.com:27017"

  amqp:
    host: "ec2-54-234-111-183.compute-1.amazonaws.com:55672"

  kaazing:

    connect:
      url: "ws://cadt0734.rms.com:8004/amqp"
      credentials:
        username: "guest"
        password: "guest"
      virtualHost: "/"

    exchange:
      exchange: 'DOSignalX'
      type: 'topic'
      passive: false
      durable: true
      noWait: false
      desc: "Config used by declareExchange"

    queue:
      passive: false
      durable: true
      exclusive: false
      autoDelete: true
      noWait: false
      desc: "Config used by declareQueue"

    bind:
      exchange: "DOSignalX"
      routingKey: "#"
      noWait: false
      desc: "Config used by doBind"

    consume:
      consumerTag: "vizdo"
      noLocal: false
      noAck: true
      exclusive: false
      noWait: true
      desc: "Config used by doBind"

  mongoose:
    baseUri: "http://cadt0734.rms.com:27080/DODatabase"
    skip: 0
    limit: 40
    batchsize: 40

