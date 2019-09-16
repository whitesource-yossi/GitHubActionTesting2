#!/bin/bash

echo yos start
echo $GITHUB_TOKEN
echo $GITHUB_EVENT_NAME
cat $GITHUB_EVENT_PATH
echo yos end
 
sh -c "docker -v"

sh -c "docker login docker.pkg.github.com -u whitesource-yossi -p 2ed9500e514e3b0c009bee5d7abdae6d4d3a0ef3"

sh -c "docker pull docker.pkg.github.com/whitesource-yossi/githubactiontesting2/public_demo_packages:2.0"

sh -c "docker images"



