presets.dev1 =
  cluster: "dev1"

  journal:
    host: "ec2-184-73-9-249.compute-1.amazonaws.com:27017"

  kaazing:

    connect:
      url: "ws://cadt0734.rms.com:8001/amqp"
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
      queue: 'vizdoconsumer'
      passive: false
      durable: false
      exclusive: false
      autoDelete: true
      noWait: false
      desc: "Config used by declareQueue"

    bind:
      queue: "vizdoconsumer"
      exchange: "DOSignalX"
      routingKey: "#"
      noWait: false
      desc: "Config used by doBind"

    consume:
      queue: "vizdoconsumer"
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

