# Base Node
FROM node:25

LABEL author="Jon Arbell De Ocampo"

WORKDIR /dist

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod

COPY dist/ ./  

EXPOSE 8000

ENTRYPOINT ["node", "src/app.js"]
