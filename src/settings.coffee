root = exports ? this

root.ids =
  mongoose: "mongooseUriId"
  journal:  "journalUriId"
  kaazing: "kaazingUriId"
  signal: "signalXId"
  batchsize: "batchSizeId"
  cluster: "clusterNameId"
  skip: "skipId"

root.settings = [

  id: ids.mongoose
  label: "Mongoose Uri: "
  value: "cadt0734.rms.com:27080/DODatabase"
  size: 48
 ,
  # { id: s2, label: "Journal Host:", value: "ec2-184-73-9-249.compute-1.amazonaws.com:
  id: ids.journal
  label: "Journal Uri:"
  value: "ec2-184-73-9-249.compute-1.amazonaws.com:27017"
  size: 48
 ,
  id: ids.kaazing
  label: "Kaazing Uri:"
  value: "ws://cadt0734.rms.com:8001/amqp"
  size: 48
 ,
  id: ids.signal
  label: "Signal Exchange:"
  value: "signalX"
  size: 20
 ,
  id: ids.batchsize
  label: "Batch size:"
  value: 20
  size: 8
 ,
  id: ids.skip
  label: "Skip:"
  value: 40
  size: 8
 ,
  id: ids.cluster
  label: "Cluster:"
  value: "Dev1"
  size: 40

]