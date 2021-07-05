const app = require('../app');
const path = require('path');
require('dotenv').config();
const { connectMongo } = require('../src/database/db');
const { createFolderIsNotExist } = require('../src/helpers/createFolders');

const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);
const IMG_DIR = path.join(process.cwd(), 'public', 'avatars');

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectMongo();

    app.listen(PORT, async () => {
      await createFolderIsNotExist(UPLOAD_DIR);
      await createFolderIsNotExist(IMG_DIR);
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
