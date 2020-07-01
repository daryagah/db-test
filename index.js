const express = require('express');
const app = express();
const server = require('http').createServer(app);
const PORT = 4000;
server.listen(PORT);
console.log(`Server is running on port ${PORT}`);

const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'cloudsql-proxy',
    database: 'chatbot_db',
    password: process.env.DB_PWD,
    port: 5432,
  });
client.connect();
client.query('SELECT * FROM users', (err, res) => {
    console.log(err, res)
    client.end()
});
