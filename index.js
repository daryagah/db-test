const express = require('express');
const app = express();
const server = require('http').createServer(app);
const PORT = 4000;
server.listen(PORT);
console.log(`Server is running on port ${PORT}`);

const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL;
const client = new Client({
    connectionString: connectionString,
});
client.connect();
client.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    client.end()
});
