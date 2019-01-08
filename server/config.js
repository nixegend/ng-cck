// const dbName = '';
// const devDBurl = `://localhost:27017/${dbName}`;
// const prodDBurl = `://...:447234/${dbName}`;
// dbUrl: (process.env.NODE_ENV === 'development') ? devDBurl : prodDBurl,

module.exports = {
  host: 'localhost',
  port: (process.env.NODE_ENV === 'development') ? 8888 : process.env.PORT,
  origin: 'http://localhost:4200',
  src: '../src',
  dist: '../dist',
  static: '../src/assets'
};
