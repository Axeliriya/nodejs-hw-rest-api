const app = require('../app');
require('dotenv').config();
const { connectMongo } = require('../src/database/db');

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectMongo();

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
