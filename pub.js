//writes a message to a NSQ topic
//usage: 
// $ node pub.js -t node -c "node-sub" -l "127.0.0.1:4161"
 
var nsq = require('nsqjs');
var program = require('commander');
 
program
  .option('-t, --nsqtopic [value]', 'Nsq topic', 'topic')
  .option('-h, --nsqdhost [value]', 'Nsqd Host', "127.0.0.1")
  .option('-p, --nsqdport [value]', 'Nsqd TCP Port', "4150")
  .parse(process.argv);

var writer = new nsq.Writer(program.nsqdhost, program.nsqdport);

writer.connect();

writer.on('ready', function () {
    writer.publish(program.nsqtopic, 'message from pub.js', function (err) {
      if (err) { return console.error(err.message); }
      writer.close();
    });    
});

writer.on('closed', function () {
  console.log('Writer closed');
});
