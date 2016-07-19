FROM postgres
MAINTAINER UbiquitousMarmoset

# Create the database
COPY init.sql /docker-entrypoint-initdb.d/init.sql

# Replace sh with bash so we can use source
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Install Node
RUN apt-get update
RUN apt-get install -y curl
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash \
  && source /root/.bashrc \
  && nvm install node

# Set up an app directory
RUN mkdir -p /usr/src/rumi
