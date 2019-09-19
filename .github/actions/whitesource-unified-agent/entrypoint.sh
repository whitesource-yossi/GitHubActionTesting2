#!/bin/bash

echo yos start
echo $GITHUB_TOKEN
echo $GITHUB_EVENT_NAME
cat $GITHUB_EVENT_PATH
echo yos end
 
sh -c "docker -v"
sh -c "docker login docker.pkg.github.com -u whitesource-yossi -p $GITHUB_TOKEN"
docker pull docker.pkg.github.com/whitesource-yossi/githubactiontesting2/public_demo_packages:2.0

sh -c "docker pull django"
sh -c "docker images"
echo pwd
pwd
echo ls . start
ls .
echo ls /
ls /
echo end ls
java -jar /wss-unified-agent.jar "$@"



