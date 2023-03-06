FROM node:16
COPY ./frontend/package*.json .
WORKDIR /app
RUN npm install