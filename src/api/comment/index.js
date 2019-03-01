/* eslint-disable camelcase */
import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as bodyman } from 'bodymen';
import { token } from '../../services/passport';
import { create, index, show, update, destroy } from './controller';
import Comment, { schema } from './model';
export { Comment, schema };

const router = new Router();
const { post_id, body } = schema.tree;

/**
 * @api {post} /comments Create comment
 * @apiName CreateComment
 * @apiGroup Comment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam post_id Comment's post_id.
 * @apiParam body Comment's body.
 * @apiSuccess {Object} comment Comment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Comment not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  bodyman({ post_id, body }),
  create);

/**
 * @api {get} /comments Retrieve comments
 * @apiName RetrieveComments
 * @apiGroup Comment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} comments List of comments.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index);

/**
 * @api {get} /comments/:id Retrieve comment
 * @apiName RetrieveComment
 * @apiGroup Comment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} comment Comment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Comment not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show);

/**
 * @api {put} /comments/:id Update comment
 * @apiName UpdateComment
 * @apiGroup Comment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam post_id Comment's post_id.
 * @apiParam body Comment's body.
 * @apiSuccess {Object} comment Comment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Comment not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  bodyman({ post_id, body }),
  update);

/**
 * @api {delete} /comments/:id Delete comment
 * @apiName DeleteComment
 * @apiGroup Comment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Comment not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy);

export default router;
