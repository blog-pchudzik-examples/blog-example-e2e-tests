FROM node:8.9.4

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package.json .
COPY . .

RUN npm install

CMD ["npm", "test"]
