import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as bodymen } from 'bodymen';
import { token } from '../../services/passport';
import { create, index, update, destroy } from './controller';
import Messages, { schema } from './model';
export { Messages, schema };

const router = new Router();
const { body, attachments } = schema.tree;

/**
 * @api {post} /messages/:chat-id Create messages
 * @apiName CreateMessages
 * @apiGroup Messages
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam body Messages's body.
 * @apiParam attachments Messages's attachments.
 * @apiSuccess {Object} messages Messages's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Messages not found.
 * @apiError 401 user access only.
 */
router.post('/:id',
  token({ required: true }),
  bodymen({ body, attachments }),
  create);

/**
 * @api {get} /messages/:chat-id Retrieve messages
 * @apiName RetrieveMessages
 * @apiGroup Messages
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of messages.
 * @apiSuccess {Object[]} rows List of messages.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  query(),
  index);

/**
 * @api {put} /messages/:msg-id Update messages
 * @apiName UpdateMessages
 * @apiGroup Messages
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam body Messages's body.
 * @apiParam attachments Messages's attachments.
 * @apiSuccess {Object} messages Messages's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Messages not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  bodymen({ body, attachments }),
  update);

/**
 * @api {delete} /messages/:msg-id Delete messages
 * @apiName DeleteMessages
 * @apiGroup Messages
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Messages not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy);

export default router;
