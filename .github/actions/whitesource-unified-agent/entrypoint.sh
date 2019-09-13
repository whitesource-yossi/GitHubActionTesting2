#!/bin/bash

echo yos start
echo $GITHUB_TOKEN
echo $GITHUB_EVENT_NAME
cat $GITHUB_EVENT_PATH
echo yos end
 
sh -c "docker -v"

sh -c "docker pull django"
sh -c "docker images"
echo ls
ls .
ls /
echo end ls
java -jar /wss-unified-agent.jar "$@"
