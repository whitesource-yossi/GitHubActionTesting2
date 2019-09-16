#!/bin/bash

echo yos start
echo $GITHUB_TOKEN
echo $GITHUB_EVENT_NAME
cat $GITHUB_EVENT_PATH
echo yos end
 
sh -c "docker -v"

sh -c "docker login docker.pkg.github.com -U whitesource-yossi -p e62f058f925a4dfcb87f4acca4df64ba00285cbc"

sh -c "docker pull docker.pkg.github.com/whitesource-yossi/githubactiontesting2/public_demo_packages:2.0"

sh -c "docker images"



