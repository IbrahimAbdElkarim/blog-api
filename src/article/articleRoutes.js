const router = require('express').Router();
const articleController = require('./articleController');
const articleSchema = require('./articleSchema');
const joiSchemaValidation = require('../../middleware/joiSchemaValidation');
const tokenValidation = require('../../middleware/tokenValidation');

//** --------------------- POST --------------------- */

/**
 * @swagger
 * /api/article/:
 *   post:
 *     summary: create aritcle
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Article
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: article title
 *                 required: true
 *                 maxLength: 256
 *               body:
 *                 type: string
 *                 description: article body
 *                 required: true
 *     responses:
 *       '201':
 *         description: Created successfully
 */
router.post('/', tokenValidation.validateToken, joiSchemaValidation.validateBody(articleSchema.createArticle), articleController.createArticle);

//** --------------------- PUT --------------------- */

/**
 * @swagger
 * /api/article/{id}:
 *   put:
 *     summary: update aritcle
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Article
 *     parameters:
 *       - in: params
 *         name: id
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: article title
 *                 maxLength: 256
 *               body:
 *                 type: string
 *                 description: article body
 *     responses:
 *       '200':
 *         description: Updated successfully
 */
router.put('/:id', tokenValidation.validateToken, joiSchemaValidation.validateBody(articleSchema.updateArticle), articleController.updateArticle);

//** --------------------- GET --------------------- */

/**
 * @swagger
 * /api/article/:
 *   get:
 *     summary: update aritcle
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Article
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: get successfully
 */
router.get('/', tokenValidation.validateToken, joiSchemaValidation.validateQueryParams(articleSchema.getArticls), articleController.getArticls);

/**
 * @swagger
 * /api/article/{id}:
 *   get:
 *     summary: get aritcle by id
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Article
 *     parameters:
 *       - in: params
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: get successfully
 */
router.get('/:id', tokenValidation.validateToken, articleController.articleById);

//** --------------------- DELETE --------------------- */

module.exports = router;
