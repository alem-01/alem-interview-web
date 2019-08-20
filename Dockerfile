FROM node:lts-alpine
COPY . .
RUN npm i --log-level warn; \
    npm i vue-text-glitch --save; \
	npm run build --silent

RUN npm install -g serve
CMD ["serve", "-s", "build"]
