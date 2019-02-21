import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as bodymen } from 'bodymen';
import { token } from '../../services/passport';
import { create, index, show, update, destroy } from './controller';
import News, { schema } from './model';

export { schema, News };

const router = new Router();
// eslint-disable-next-line camelcase
const { title, body, author_id, preview, background, type } = schema.tree;

/**
 * @api {post} /news Create news
 * @apiName CreateNews
 * @apiGroup News
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam title News's title.
 * @apiParam body News's body.
 * @apiParam author_id News's author_id.
 * @apiParam preview News's preview.
 * @apiParam background News's background.
 * @apiParam type News's type.
 * @apiSuccess {Object} news News's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 News not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  bodymen({ title, body, author_id, preview, background, type }),
  create);

/**
 * @api {get} /news Retrieve news
 * @apiName RetrieveNews
 * @apiGroup News
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of news.
 * @apiSuccess {Object[]} rows List of news.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index);

/**
 * @api {get} /news/:id Retrieve news
 * @apiName RetrieveNews
 * @apiGroup News
 * @apiSuccess {Object} news News's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 News not found.
 */
router.get('/:id',
  show);

/**
 * @api {put} /news/:id Update news
 * @apiName UpdateNews
 * @apiGroup News
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam title News's title.
 * @apiParam body News's body.
 * @apiParam author_id News's author_id.
 * @apiParam preview News's preview.
 * @apiParam background News's background.
 * @apiParam type News's type.
 * @apiSuccess {Object} news News's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 News not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  bodymen({ title, body, author_id, preview, background, type }),
  update);

/**
 * @api {delete} /news/:id Delete news
 * @apiName DeleteNews
 * @apiGroup News
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 News not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy);

export default router;
