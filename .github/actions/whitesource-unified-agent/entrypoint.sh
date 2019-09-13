#!/bin/bash

echo yos start
echo $GITHUB_TOKEN
echo $GITHUB_EVENT_NAME
cat $GITHUB_EVENT_PATH
echo yos end

echo sh -c "/usr/bin/docker -v"
