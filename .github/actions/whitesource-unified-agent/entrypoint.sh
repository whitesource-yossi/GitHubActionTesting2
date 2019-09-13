#!/bin/bash

echo yos start
echo $GITHUB_TOKEN
echo $GITHUB_EVENT_NAME
cat $GITHUB_EVENT_PATH
echo yos end

sh -c "docker -v"
sh -c "docker login docker.pkg.github.com -u whitesource-yossi -p 903700b0b1563f6ab65a8d91e8e32edc66d9a95f"
sh -c "docker pull docker.pkg.github.com/whitesource-yossi/githubactiontesting2/demo_docker:1.0"
sh -c "docker images"
