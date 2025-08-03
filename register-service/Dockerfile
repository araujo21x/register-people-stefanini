FROM node:22-alpine
WORKDIR /home/app
COPY package*.json ./
RUN npm install -g @nestjs/cli
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 9000
CMD ["npm", "run", "start:prod"]