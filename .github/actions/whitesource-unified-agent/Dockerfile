FROM docker:stable

RUN apk --update add bash && \
    apk add dos2unix
    
WORKDIR /

COPY entrypoint.sh /
RUN dos2unix /entrypoint.sh
RUN chmod +x entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]
CMD [ "-help" ]
