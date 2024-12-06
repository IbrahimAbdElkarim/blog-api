const router = require('express').Router();
const commentController = require('./commentController');
const commentSchema = require('./commentSchema');
const joiSchemaValidation = require('../../middleware/joiSchemaValidation');
const tokenValidation = require('../../middleware/tokenValidation');

//** --------------------- POST --------------------- */

/**
 * @swagger
 * /api/comment/:
 *   post:
 *     summary: create aritcle
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               article:
 *                 type: string
 *                 description: article id
 *                 required: true
 *               text:
 *                 type: string
 *                 description: article body
 *                 required: true
 *     responses:
 *       '201':
 *         description: Created successfully
 */
router.post('/', tokenValidation.validateToken, joiSchemaValidation.validateBody(commentSchema.createComment), commentController.createComment);

//** --------------------- PUT --------------------- */



//** --------------------- GET --------------------- */

/**
 * @swagger
 * /api/comment/:
 *   get:
 *     summary: update aritcle
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Comment
 *     parameters:
  *       - in: query
 *         name: article
 *         schema:
 *           type: string
 *           required: true
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
router.get('/', tokenValidation.validateToken, joiSchemaValidation.validateQueryParams(commentSchema.getComments), commentController.getComments);


//** --------------------- DELETE --------------------- */

module.exports = router;
