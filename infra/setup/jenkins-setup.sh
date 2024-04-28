#!/bin/bash

# create jenkins image for docker 

echo " Creating custom jenkins file this will take some time"

echo """

FROM jenkins/jenkins:2.440.3-jdk17
USER root
RUN apt-get update && apt-get install -y lsb-release
RUN curl -fsSLo /usr/share/keyrings/docker-archive-keyring.asc \
  https://download.docker.com/linux/debian/gpg
RUN echo "deb [arch='$(dpkg --print-architecture)' \
  signed-by=/usr/share/keyrings/docker-archive-keyring.asc] \
  https://download.docker.com/linux/debian \
  '$(lsb_release -cs)' stable" > /etc/apt/sources.list.d/docker.list

RUN apt-get update && apt-get install -y docker-ce-cli
USER jenkins
RUN jenkins-plugin-cli --plugins "blueocean docker-workflow"

""" > Dockerfile

docker build -t jenkins-blueocean-custom:latest .

echo " File created"
docker image ls | grep jenkins-blueocean-custom
