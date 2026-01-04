# Node.js LTS as a base
FROM node:20-slim

WORKDIR /app

# copy package.json for dependency installation
COPY package.json package-lock.json* ./

# lib installation
RUN npm install

COPY . .

# set port 3000
EXPOSE 3000

# run the developement mode
CMD ["npm", "run", "dev"]