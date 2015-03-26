#!/bin/bash
set -euo pipefail

LOG=../nsq/log
DATA=../nsq/data

nsqlookupd &> $LOG/nsqlookupd.log &
nsqd -data-path="$DATA" --lookupd-tcp-address=127.0.0.1:4160 &> $LOG/nsqd.log &
nsqadmin --lookupd-http-address=127.0.0.1:4161 &> $LOG/nsqadmin.log &
