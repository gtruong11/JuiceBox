const { PORT = 3000 } = process.env
const express = require('express');
const server = express();
const app = express();
const morgan = require('morgan');
const { client } = require('./db');
client.connect();
require('dotenv').config();

server.use(morgan('dev'));

server.use(express.json())


server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
  
});

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  
  console.log("<_____Body Logger END_____>");

  next();
});


app.use('/api', (req, res, next) => {
  console.log("A request was made to /api");
  next();
});

app.get('/api', (req, res, next) => {
  console.log("A get request was made to /api");
  res.send({ message: "success" });
});




const apiRouter = require('./api');
server.use('/api', apiRouter);
