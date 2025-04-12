FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install
# The ENCRYPT_KEY should be passed securely as an environment variable during runtime
COPY . .

CMD ["npm", "run", "start:dev"]
