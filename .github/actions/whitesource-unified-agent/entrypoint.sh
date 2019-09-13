#!/bin/bash

echo yos start
echo $GITHUB_TOKEN
echo $GITHUB_EVENT_NAME
cat $GITHUB_EVENT_PATH
echo yos end
 
sh -c "docker -v"
sh -c "docker logout"
sh -c "docker login docker.pkg.github.com -u whitesource-yossi -p 2db0057ecdd9a66a69e130191ff1783415e8d8d7"
sh -c "docker pull docker.pkg.github.com/whitesource-yossi/githubactiontesting2/demo_docker:1.0"
sh -c "docker images"
