FROM nginx:alpine

COPY html/ /usr/share/nginx/html/

LABEL org.opencontainers.image.title="1337.attac.us"
LABEL org.opencontainers.image.description="Web server for http://1337.attac.us"
LABEL org.opencontainers.image.authors="Jack Willis <jack@attac.us>"
LABEL org.opencontainers.image.source="https://github.com/jackwillis/1337.attac.us"

