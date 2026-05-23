FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4174

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

USER node

EXPOSE 4174

CMD ["npm", "start"]
