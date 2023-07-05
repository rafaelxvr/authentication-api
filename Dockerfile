FROM node:18
WORKDIR /usr/src/auth-api
COPY ./package.json .
RUN npm install --omit=dev
COPY ./dist ./dist
EXPOSE 6061
CMD npm start