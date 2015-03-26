//writes a message to a NSQ topic

var nsq = require('nsqjs');
var writer = new nsq.Writer('127.0.0.1', 4150);

writer.connect();

writer.on('ready', function () {
    writer.publish('topic', 'message', function (err) {
      if (err) { return console.error(err.message); }
      writer.close();
    });    
});

writer.on('closed', function () {
  console.log('Writer closed');
});
