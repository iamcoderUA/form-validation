const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sendMail = require('./send-mail');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.set('views', './prod');
app.set('view engine', 'html');

app.use(express.static(`${__dirname}/prod/`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});
app.post('/send-mail', sendMail);

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/prod/index.html`));
});
app.listen(port, (req, res) => {
  console.log('Server is running at port: ', port);
});
