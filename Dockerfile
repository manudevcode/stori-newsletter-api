FROM node:alpine

WORKDIR /app
ADD . .
RUN yarn install
#RUN yarn version patch
RUN yarn run build

EXPOSE 3000

CMD ["yarn", "run", "start:prod"]