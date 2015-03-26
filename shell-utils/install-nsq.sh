#!/bin/bash
set -euo pipefail

[[ -d /opt/nsq ]] && sudo rm -rf /opt/nsq

#Download Nsq for your platform (Mac or Linux)
curl -L "https://github.com/bitly/nsq/releases/download/v0.3.2/nsq-0.3.2.`uname -s`-amd64.go1.4.1.tar.gz" | tar xz

#Move Nsq.io binaries to /opt/nsq
sudo mv nsq*/bin /opt/nsq && rm -rf ./nsq*

#add /opt/nsq to $PATH
echo "export PATH=$PATH:/opt/nsq" >> ~/.bashrc 
export PATH=$PATH:/opt/nsq
