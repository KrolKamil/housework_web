const http = require('http');
const db = require('./db');
const app = require('./app');
const socket = require('./socket');

const runningPort = process.env.PORT || 3000;

const server = () => {
  db();
  const server = http.createServer(app());
  socket(server);
  server.listen(runningPort, () => { console.log(`Server staretd at port: ${runningPort}`); });
};

module.exports = server;
