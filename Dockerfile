FROM node
COPY . /app
WORKDIR /app
RUN npm install

ENTRYPOINT node app.js
