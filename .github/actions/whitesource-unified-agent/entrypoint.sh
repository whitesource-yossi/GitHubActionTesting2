#!/bin/bash

echo yos start
echo $GITHUB_TOKEN
echo $GITHUB_EVENT_NAME
cat $GITHUB_EVENT_PATH
echo yos end

sh -c "/usr/bin/docker pull docker.pkg.github.com/whitesource-yossi/githubactiontesting2/demo_docker:1.0"
