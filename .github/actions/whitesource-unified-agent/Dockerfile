FROM openjdk:8

WORKDIR /

COPY entrypoint.sh /
RUN chmod +x entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]
CMD [ "-help" ]
