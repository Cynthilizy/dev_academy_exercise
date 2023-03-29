FROM node:19.0.0
COPY . /dockerApp
COPY ./docker-db/dump.sql /dump.sql
WORKDIR /dockerApp
RUN npm install -g concurrently
RUN npm install
EXPOSE 3000 3070
CMD ["npm", "start"]



