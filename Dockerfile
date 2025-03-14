FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . . 

RUN NODE_OPTIONS="--max-old-space-size=2048" npm run build

EXPOSE 3000

CMD ["npm", "start"]
