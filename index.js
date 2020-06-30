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
try {
    await client.query('BEGIN')
    const queryText = 'INSERT INTO clients(client_name, industry, location) VALUES($1, $2, $3)'
    await client.query(queryText, ['Brian', 'Retail', 'Tampa, FL'])
    await client.query('COMMIT')
} catch (e) {
    await client.query('ROLLBACK')
    throw e
} finally {
    client.release()
}
client.connect();
client.query('SELECT * FROM clients;', (err, res) => {
    console.log(err, res)
    client.end()
});
