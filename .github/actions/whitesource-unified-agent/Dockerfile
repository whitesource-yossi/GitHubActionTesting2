FROM docker:stable

WORKDIR /

COPY entrypoint.sh /
RUN dos2unix /entrypoint.sh
RUN chmod +x entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]
CMD [ "-help" ]
