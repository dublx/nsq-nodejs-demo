var express = require('express');
var nsq = require('nsqjs');
var program = require('commander');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.text({type:"*/*"}));

program
  .option('-w, --httpport [value]', 'Express port', '3000')
  .option('-f, --nsqfromtopic [value]', 'Nsq topic', 'topic')
  .option('-t, --nsqtotopic [value]', 'Nsq topic', 'totopic')
  .option('-h, --nsqdhost [value]', 'Nsqd Host', "127.0.0.1")
  .option('-p, --nsqdport [value]', 'Nsqd TCP Port', "4150")
  .parse(process.argv);

var writer = new nsq.Writer(program.nsqdhost, program.nsqdport);
writer.connect();

app.post("/" + program.nsqfromtopic, function (req, res) {
  console.log(req.body);
    writer.publish(program.nsqtotopic, {"a":1, "reqBody": req.body}, function (err) {
      if (err) return console.error(err.message); 
    });
    res.status(200).send({"nsq":true});
});

app.get("/ping", function (req, res) {
    res.status(200).send('pong');
});

var server = app.listen(program.httpport, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});