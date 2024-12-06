const express = require('express');
const swagger = require('./swagger');
const http = require('http');
const path = require('path');
const dotEnv = require('dotenv');
dotEnv.config();
const cors = require('cors');
const dbConnection = require('./utils/connection');
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');
const ErrorHandler = require('./error/ErrorHandler');
const userRoutes = require('./src/user/userRoutes');
const articleRoutes = require('./src/article/articleRoutes');
const commentRoutes = require('./src/comment/commentRoutes');
const voteRoutes = require('./src/vote/voteRoutes');

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en-US',
    backend: {
      loadPath: './error/locales/{{lng}}/translation.json'
    }
  });
// Database Connect
dbConnection();

const app = express();
const server = http.createServer(app);
app.disable('x-powered-by');

// Cors Middleware
app.use(cors());

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// set public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(middleware.handle(i18next));

app.use('/api/user', userRoutes);
app.use('/api/article', articleRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/vote', voteRoutes);

// Swagger
swagger(app);

// Error Handling Middleware
app.use(ErrorHandler);

// Listen To Port 4001 || 3000
const port = process.env.PORT || 3000;
console.log(port);
server.listen(port);
