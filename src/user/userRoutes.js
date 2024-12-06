const router = require('express').Router();
const userController = require('./userController');
const userSchema = require('./userSchema');
const joiSchemaValidation = require('../../middleware/joiSchemaValidation');

//** --------------------- POST --------------------- */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: User register
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
  *               name:
 *                 type: string
 *                 description: User name
 *                 required: true
 *               email:
 *                 type: string
 *                 description: User email
 *                 format : email
 *                 required: true
 *               password:
 *                 type: string
 *                 description: User password
 *                 required: true
 *                 minLength: 8
 *     responses:
 *       '201':
 *         description: Created successfully
 */
router.post('/register',  joiSchemaValidation.validateBody(userSchema.register), userController.register);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User email
 *                 format : email
 *                 required: true
 *               password:
 *                 type: string
 *                 description: User password
 *     responses:
 *       '200':
 *         description: Login successfully
 *       '604':
 *         description: Invalid password
 *       '600':
 *         description: User not found
 */
router.post('/login', joiSchemaValidation.validateBody(userSchema.login), userController.login);

//** --------------------- PUT --------------------- */

//** --------------------- GET --------------------- */

//** --------------------- DELETE --------------------- */

module.exports = router;
