var nsq = require('nsqjs');
var program = require('commander');
 
program
  .option('-t, --nsqtopic [value]', 'Nsq topic', 'topic')
  .option('-c, --nsqchannel [value]', 'Nsq channel', 'channel')
  .option('-l, --nsqlookups [value]', 'comma separated list of Nsq Lookups HTTP Address', "127.0.0.1:4161")
  .parse(process.argv);


var reader = new nsq.Reader(program.nsqtopic, program.nsqchannel, {
  lookupdHTTPAddresses: program.nsqlookups
});

reader.connect();

reader.on('message', function (msg) {
  console.log('Received message [%s]: %s', msg.id, msg.body.toString());
  msg.finish();
});
