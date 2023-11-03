FROM node:18-alpine
WORKDIR /app
COPY . .
VOLUME . /usr/src/app
RUN yarn install
CMD ["yarn", "start"]
EXPOSE 3000