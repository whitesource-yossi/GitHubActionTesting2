FROM docker:stable

RUN apk --update add bash && \
    apk add dos2unix

RUN apk --update add openjdk8-jre

WORKDIR /

COPY wss-unified-agent.jar /
COPY wss-unified-agent.config /

COPY entrypoint.sh /
RUN dos2unix /entrypoint.sh
RUN chmod +x entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]
CMD [ "-help" ]
