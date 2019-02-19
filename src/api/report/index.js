import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as bodymen } from 'bodymen';
import { token } from '../../services/passport';
import { create, index, show, update, destroy } from './controller';
import Report, { schema } from './model';
export {
  Report,
  schema
};

const router = new Router();
// eslint-disable-next-line camelcase
const { name, body, post_id, user_id, authod_id, status } = schema.tree;

/**
 * @api {post} /reports Create report
 * @apiName CreateReport
 * @apiGroup Report
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Report's name.
 * @apiParam body Report's body.
 * @apiParam post_id Report's post_id.
 * @apiParam user_id Report's user_id.
 * @apiParam authod_id Report's authod_id.
 * @apiParam status Report's status.
 * @apiSuccess {Object} report Report's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Report not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  bodymen({ name, body, post_id, user_id, authod_id, status }),
  create);

/**
 * @api {get} /reports Retrieve reports
 * @apiName RetrieveReports
 * @apiGroup Report
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of reports.
 * @apiSuccess {Object[]} rows List of reports.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index);

/**
 * @api {get} /reports/:id Retrieve report
 * @apiName RetrieveReport
 * @apiGroup Report
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} report Report's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Report not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show);

/**
 * @api {put} /reports/:id Update report
 * @apiName UpdateReport
 * @apiGroup Report
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Report's name.
 * @apiParam body Report's body.
 * @apiParam post_id Report's post_id.
 * @apiParam user_id Report's user_id.
 * @apiParam authod_id Report's authod_id.
 * @apiParam status Report's status.
 * @apiSuccess {Object} report Report's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Report not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  bodymen({ name, body, post_id, user_id, authod_id, status }),
  update);

/**
 * @api {delete} /reports/:id Delete report
 * @apiName DeleteReport
 * @apiGroup Report
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Report not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy);

export default router;
