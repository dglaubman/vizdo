presets.qa1 =
  cluster: "qa1"

  journal:
    host: "ec2-23-22-139-188.compute-1.amazonaws.com:27017"

  amqp:
    host: "ec2-107-21-184-64.compute-1.amazonaws.com:55672"

  kaazing:

    connect:
      url: "ws://cadt0734.rms.com:8003/amqp"
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
    skip: 0
    limit: 30
    batchsize: 30
