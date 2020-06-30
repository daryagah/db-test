FROM node:12
WORKDIR /app
COPY package.json package*.json ./
RUN npm install --only=production
RUN apt-get update && apt-get install -y postgresql
RUN wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 -O cloud_sql_proxy && chmod +x cloud_sql_proxy
COPY . .
VOLUME /app
CMD ["npm", "start"]
