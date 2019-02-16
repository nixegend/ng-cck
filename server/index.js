const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const fallback = require('express-history-api-fallback');

const serverConfig = require('./config');
const apiRoutes = require('./api.routes');

const api = require('./constants/api');
const app = express();

const corsOptionsDelegate = (req, callback) => {
  const corsOptions = {
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    origin: req.header('Origin') === serverConfig.origin,
    credentials: true,
    optionsSuccessStatus: 200
  };

  callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate)); // CORS middleware on express side

app.use(express.static(__dirname + serverConfig.static));
app.use(express.static(__dirname + serverConfig.dist));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(fallback(__dirname + `${serverConfig.src}/index.html`));

app.get('/*', (req, res, next) => {
  if (req.url.indexOf(api.API_PATH) === -1) {
    res.sendFile(__dirname + `${serverConfig.src}/index.html`);
  }

  next();
});

app.use(api.API_PATH, apiRoutes);

app.listen(serverConfig.port, () => {
  console.log('server is available by: ', `http://${serverConfig.host}:${serverConfig.port}`);
});
