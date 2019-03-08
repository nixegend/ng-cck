// const dbName = '';
// const devDBurl = `://localhost:27017/${dbName}`;
// const prodDBurl = `://...:447234/${dbName}`;
// dbUrl: (process.env.NODE_ENV === 'development') ? devDBurl : prodDBurl,

module.exports = {
  host: 'localhost',
  jwtSecret: 'worldisfullofdevelopers',
  tokenExpireTime: 3600, // hour
  port: (process.env.NODE_ENV === 'development') ? 8888 : process.env.PORT,
  origin: 'http://localhost:4200',
  src: '../src',
  dist: '../dist',
  static: '../src/assets',
  // https://node-postgres.com/api/client
  db: {
    user: 'postgres',
    password: '12345',
    database: 'cck',
    host: 'localhost',
    port: 5432
  }
};
