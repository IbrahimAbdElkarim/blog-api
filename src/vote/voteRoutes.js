const router = require('express').Router();
const voteController = require('./voteController');
const voteSchema = require('./voteSchema');
const joiSchemaValidation = require('../../middleware/joiSchemaValidation');
const tokenValidation = require('../../middleware/tokenValidation');

//** --------------------- POST --------------------- */

/**
 * @swagger
 * /api/vot/:
 *   post:
 *     summary: create vote
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Vot
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
 *               vote:
 *                 type: number
 *                 enum: [1, -1]
 *                 example: 1
 *                 required: true
 *     responses:
 *       '201':
 *         description: Created successfully
 */
router.post('/', tokenValidation.validateToken, joiSchemaValidation.validateBody(voteSchema.createvote), voteController.createvote);

//** --------------------- PUT --------------------- */



//** --------------------- GET --------------------- */
/**
 * @swagger
 * /api/vote/{articleId}:
 *   get:
 *     summary: get aritcle votes
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Article
 *     parameters:
 *       - in: params
 *         name: articleId
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: get successfully
 */
router.get('/:articleId', tokenValidation.validateToken, voteController.getArticleVotes);


//** --------------------- DELETE --------------------- */

module.exports = router;
