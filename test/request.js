const express = require('express');
const ErrorHandler = require('../error/ErrorHandler');
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');
const app = express();
const userRoutes = require('../src/user/userRoutes');
const articleRoutes = require('../src/article/articleRoutes');
const commentRoutes = require('../src/comment/commentRoutes');
const voteRoutes = require('../src/vote/voteRoutes');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en-US',
    backend: {
      loadPath: '../error/locales/{{lng}}/translation.json'
    }
  });
app.use(middleware.handle(i18next));

app.use('/api/user', userRoutes);
app.use('/api/article', articleRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/vote', voteRoutes);

app.use(ErrorHandler);

const request = require('supertest');
const req = request(app);
module.exports = req;
