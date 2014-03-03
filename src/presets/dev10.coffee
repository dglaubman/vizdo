presets.dev10 =
  cluster: "dev10"

  journal:
    host: "mgcrpl102be2b1.lab.rmsonecloud.net:27017"

  amqp:
    host: "haa-msg-vip-dev10-151d7e30.lab.rmsonecloud.net:55672"

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

