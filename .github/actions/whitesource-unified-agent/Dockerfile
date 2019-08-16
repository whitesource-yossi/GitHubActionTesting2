FROM openjdk:8

WORKDIR /

COPY wss-unified-agent.jar /
COPY wss-unified-agent.config /
COPY entrypoint.sh /

ENTRYPOINT [ "/entrypoint.sh" ]
CMD [ "-help" ]
