const mongoose = require('mongoose');
require('dotenv').config();

const urlDb = process.env.URL_DB;

const connectMongo = async () => {
  return await mongoose.connect(urlDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
};

mongoose.connection.on('connected', () => {
  console.log('Database connected successful');
});

mongoose.connection.on('error', error => {
  console.log(`Connection error: ${error.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Database disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Connection for DB disconnected and app terminated');
    process.exit(1);
  });
});

module.exports = { connectMongo };
