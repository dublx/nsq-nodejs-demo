#!/bin/bash

#stream to nsq
while read x; do
	echo $x | to_nsq --nsqd-tcp-address=127.0.0.1:4150 --topic=stdin
done

#nsq to http
nsq_to_http -lookupd-http-address=127.0.0.1:4161 -topic=stdin -content-type="application/json" -post="http://127.0.0.1:3000/topic1"

#tail 
nsq_tail -lookupd-http-address=127.0.0.1:4161 -topic=stdin
nsq_tail -lookupd-http-address=127.0.0.1:4161 -topic=topic2

#persist
nsq_to_file -lookupd-http-address=127.0.0.1:4161 -topic=stdin -output-dir="./data"
tail -f ./data/stdin*.log

#cross Datacenter / AZ
nsq_to_nsq -destination-nsqd-tcp-address=dc2:4160 -destination-topic=stdin




#NODE.JS
# to debug nsqjs use: 
# DEBUG=nsqjs:*
# DEBUG=nsqjs:reader:*
# DEBUG=nsqjs:reader:<topic>/<channel>:*
# DEBUG=nsqjs:writer:*

node sub.js -t nodedemo -c "node-sub" -l "127.0.0.1:4161"
node pub.js -t nodedemo -h 127.0.0.1 -p 4150

node index.js -w 3000 -f topic1 -t topic2 -h 127.0.0.1 -p 4150


#URLs
Nsq Admin: http://127.0.0.1:4171