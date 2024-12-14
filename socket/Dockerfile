FROM node:16-alpine as development

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json*  ./
# RUN npm install --package-lock-only

# RUN npm install
RUN npm install --save-dev nodemon

RUN npm run

COPY . .

EXPOSE 8901

# Running the app
CMD "npm" "run" "start"