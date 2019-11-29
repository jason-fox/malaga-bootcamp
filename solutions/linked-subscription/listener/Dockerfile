ARG  NODE_VERSION=10.17.0-slim
FROM node:${NODE_VERSION}

COPY . /opt/listener/

WORKDIR /opt/listener

RUN npm install --production && \
    rm -rf /root/.npm/cache/*

# Ports used by application
EXPOSE ${LISTENER_PORT:-3005}

CMD ["npm", "start" ]
