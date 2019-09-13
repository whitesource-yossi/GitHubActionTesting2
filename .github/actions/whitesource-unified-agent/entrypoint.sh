#!/bin/bash

echo yos start
echo $GITHUB_TOKEN
echo $GITHUB_EVENT_NAME
cat $GITHUB_EVENT_PATH
echo yos end

sh -c "docker -v"
sh -c "docker login docker.pkg.github.com -u whitesource-yossi -p f6a7a1936591a13324e99136fa1e81a08c01602f"
sh -c "docker pull docker.pkg.github.com/whitesource-yossi/githubactiontesting2/demo_docker:1.0"
sh -c "docker images"
