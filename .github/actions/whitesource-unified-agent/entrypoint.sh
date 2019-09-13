#!/bin/bash

echo yos start
echo $GITHUB_TOKEN
echo $GITHUB_EVENT_NAME
cat $GITHUB_EVENT_PATH
echo yos end

sh -c "docker -v"
sh -c "docker login docker.pkg.github.com -u whitesource-yossi -p $GITHUB_TOKEN"
sh -c "docker pull docker.pkg.github.com/whitesource-yossi/githubactiontesting2/demo_docker:1.0"
sh -c "docker images"
