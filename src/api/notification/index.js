import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as bodyman } from 'bodymen';
import { token } from '../../services/passport';
import { create, index } from './controller';
import Notification, { schema } from './model';
export { Notification, schema };

const router = new Router();
const { title, body, type, picture, url, target } = schema.tree;

/**
 * @api {post} /notifications Create notification
 * @apiName CreateNotification
 * @apiGroup Notification
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam {String} target target user id
 * @apiParam title Notification's title.
 * @apiParam body Notification's body.
 * @apiParam type Notification's type.
 * @apiParam picture Notification's picture.
 * @apiParam url Notification's url.
 * @apiSuccess {Object} notification Notification's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Notification not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  bodyman({ title, body, type, picture, url, target }),
  create);

/**
 * @api {get} /notifications Retrieve notifications
 * @apiName RetrieveNotifications
 * @apiGroup Notification
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of notifications.
 * @apiSuccess {Object[]} rows List of notifications.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index);

export default router;
