const dotEnv = require('dotenv');
dotEnv.config();
const http = require('http');
const mongoose = require('mongoose');

let httpServer;

let connection;
beforeAll(async () => {
  jest.setTimeout(50000000);
  // Database Connect
  connection = await mongoose.connect(process.env.TEST_DB_URL);

  httpServer = http.createServer().listen();
});

afterAll(async () => {
  global.gc && global.gc();
  await connection.disconnect();
});
