const express = require('express');
const path = require('path');
// const fs = require('fs').promises;
// const jimp = require('jimp');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { apiLimit, jsonLimit } = require('./src/config/rate-limit.json');
const { HttpCode } = require('./src/helpers/constants');
const { router } = require('./src/api/contacts/contactsRouter');
const { routerUsers } = require('./src/api/users/usersRouter');
const { ErrorHandler } = require('./src/helpers/errorHandler');
// const upload = require('./src/helpers/multer');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
// const IMG_DIR = path.join(process.cwd(), 'public', 'avatars');

app.use(logger(formatsLogger));
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: jsonLimit }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  '/api/',
  rateLimit({
    windowMs: apiLimit.windowMs,
    max: apiLimit.max,
    handler: (req, res, next) => {
      next(
        new ErrorHandler(
          HttpCode.BAD_REQUEST,
          '15 minutes request limit exceeded',
        ),
      );
    },
  }),
);
app.use('/api/users', routerUsers);
app.use('/api/contacts', router);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    message: `Use api on routes ${req.baseUrl}/api/contacts`,
    data: 'Not Found',
  });
});

app.use((err, req, res, next) => {
  err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR;
  res.status(err.status).json({
    status: err.status === 500 ? 'fail' : 'error',
    code: err.status,
    message: err.message,
    data: err.status === 500 ? 'Internal Server Error' : err.data,
  });
});

// app.post('/upload', upload.single('avatar'), async (req, res, next) => {
//   if (req.file) {
//     const { file } = req;
//     const img = await jimp.read(file.path);
//     await img
//       .autocrop()
//       .cover(
//         250,
//         250,
//         jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE,
//       )
//       .writeAsync(file.path);
//     await fs.rename(file.path, path.join(IMG_DIR, file.originalname));
//   }
// });

module.exports = app;
