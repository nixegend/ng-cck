const path = require('path');

// const dbName = '';
// const devDBurl = `://localhost:27017/${dbName}`;
// const prodDBurl = `://...:447234/${dbName}`;

const serverConfig = (processEnv) = {
  // dbUrl: (NODE_ENV === 'development') ? devDBurl : prodDBurl,
  host: 'localhost',
  port: (processEnv.NODE_ENV === 'development') ? 8080 : processEnv.PORT,
  origin: 'http://localhost:7777',
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  static: path.join(__dirname, './src/assets')
};

exports.exports = serverConfig;
