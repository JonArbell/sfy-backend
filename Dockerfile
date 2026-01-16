FROM node:25

LABEL author="Jon Arbell De Ocampo"

# set working dir
WORKDIR /app

# install pnpm globally
RUN npm install -g pnpm

# copy package files and install deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod

# copy compiled JS files only
COPY dist/ ./dist

# expose port
EXPOSE 8000

# run your server
ENTRYPOINT ["node", "dist/server.js"]
