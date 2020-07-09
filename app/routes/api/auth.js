const express = require('express');
const router = express.Router();
const { index, login } = require('../../controllers/auth');

const { validateAuth } = require('../../middleware/validator/authValidator');
router.get('/', index);

/**
 * @swagger
 * path:
 *  /auth/:
 *    post:
 *      summary: To login user
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Auth'
 *      responses:
 *        "200":
 *          description: A auth schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Auth'
 */
router.post('/', validateAuth, login);

module.exports.router = router;
