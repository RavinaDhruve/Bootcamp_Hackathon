FROM    ubuntu:14.04
MAINTAINER  ravina.dhruve

##################### BASE INSTALLATION #####################
# Install dependencies

RUN sudo apt-get -y update
RUN sudo sudo apt-get -y install npm
RUN sudo apt-get install -y redis-server
RUN sudo apt-get install -y nodejs && apt-get install -y nodejs-legacy
RUN npm install redis && npm install express
RUN npm install jquery && npm install node-jsdom

EXPOSE 6379
ENTRYPOINT ["/usr/bin/redis-server"]

EXPOSE 80
