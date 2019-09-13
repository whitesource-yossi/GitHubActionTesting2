FROM docker:stable

RUN yum update -y && \
    yum install dos2unix -y
    
WORKDIR /

COPY entrypoint.sh /
RUN dos2unix /entrypoint.sh
RUN chmod +x entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]
CMD [ "-help" ]
