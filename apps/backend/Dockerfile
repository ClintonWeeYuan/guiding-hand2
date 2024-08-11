# Fetching the minified node image on apline linux
FROM node:slim

ARG DATABASE_URL
ARG FRONTEND_URL_PROD

# Declaring env
ENV DATABASE_URL $DATABASE_URL
ENV FRONTEND_URL_PROD $FRONTEND_URL_PROD

# Set the working directory
WORKDIR /usr/src/app

# Copying all the files in our project
COPY . ./

# Installing dependencies
RUN npm install

RUN npm run build

# Exposing server port
EXPOSE 8080

# Starting our application
CMD [ "npm", "start" ]
