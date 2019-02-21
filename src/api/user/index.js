import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import { password as passwordAuth, token } from '../../services/passport';
import { uploader } from '../../services/multer';
import { index, showMe, show, create, update, updatePassword, destroy, badges, updateAvatar, recommendations, updateFCM, removeFCM } from './controller';
import User, { schema } from './model';
export {
  User,
  schema
};

const router = new Router();
const { email, password, name, picture, desc } = schema.tree;

/**
 * @api {get} /users Retrieve users
 * @apiName RetrieveUsers
 * @apiGroup User
 * @apiPermission admin
 * @apiParam {String} access_token User access_token.
 * @apiUse listParams
 * @apiSuccess {Object[]} users List of users.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index);

/**
 * @api {get} /users/me Retrieve current user
 * @apiName RetrieveCurrentUser
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiSuccess {Object} user User's data.
 */
router.get('/me',
  token({ required: true }),
  showMe);

/**
 * @api {get} /users/:id Retrieve user
 * @apiName RetrieveUser
 * @apiGroup User
 * @apiPermission public
 * @apiSuccess {Object} user User's data.
 * @apiError 404 User not found.
 */
router.get('/:id',
  show);

/**
 * @api {post} /users Create user
 * @apiName CreateUser
 * @apiGroup User
 * @apiParam {String} email User's email.
 * @apiParam {String{6..}} password User's password.
 * @apiParam {String} [name] User's name.
 * @apiParam {String} [picture] User's picture.
 * @apiSuccess (Sucess 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 409 Email already registered.
 */
router.post('/',
  body({ email, password, name, picture, desc }),
  create);

/**
 * @api {put} /users/:id Update user
 * @apiName UpdateUser
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiParam {String} [name] User's name.
 * @apiParam {String} [picture] User's picture.
 * @apiParam {String} [desc] User's description.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user or admin access only.
 * @apiError 404 User not found.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, picture, desc }),
  update);

/**
 * @api {post} /update/avatar Update user avatar
 * @apiName UpdateUserAvatar
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiParam {File} [picture] User's new avatar
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user or admin access only.
 * @apiError 404 User not found.
 */
router.post('/update/avatar',
  token({ required: true }),
  uploader.single('picture'),
  updateAvatar);

/**
 * @api {put} /users/:id/password Update password
 * @apiName UpdatePassword
 * @apiGroup User
 * @apiHeader {String} Authorization Basic authorization with email and password.
 * @apiParam {String{6..}} password User's new password.
 * @apiSuccess (Success 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user access only.
 * @apiError 404 User not found.
 */
router.put('/:id/password',
  passwordAuth(),
  body({ password }),
  updatePassword);

/**
 * @api {delete} /users/:id Delete user
 * @apiName DeleteUser
 * @apiGroup User
 * @apiPermission admin
 * @apiParam {String} access_token User access_token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Admin access only.
 * @apiError 404 User not found.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy);

/**
 * @api {post} /users/:id Add user badges
 * @apiName AddBadges
 * @apiGroup User
 * @apiPermissions admin
 * @apiParam {Array} badges User badges
 * @apiSuccess (Success 201) 201 Created
 * @apiError 401 Admin access only.
 * @apiError 400 Error in body
 * @apiError 404 User not found.
 */
router.post('/:id',
  token({ required: true, roles: ['admin'] }),
  body({
    badges: [
      {
        name: {
          type: String,
          required: true
        },
        icon: {
          type: String,
          required: true
        }
      }
    ]
  }),
  badges);

/**
 * @api {get} /users/offer
 * @apiName UserOffer
 * @apiGroup User
 * @paiPermissions user
 * @apiSuccess {Number} count Total amount of posts.
 * @apiSuccess {Object[]} rows List of posts.
 * @apiError 401 User access only.
 */
router.get('/me/offer',
  token({ required: true }),
  query(),
  recommendations);

/**
 * @api {put} /users/me/fcm Save FCM token
 * @apiName SaveFCM
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiSuccess (Success 204) 204 No content.
 * @apiError 401 User access only.
 */
router.put('/me/fcm',
  token({ required: true }),
  body({
    token: {
      type: String,
      required: true
    }
  }),
  updateFCM);

/**
 * @api {delete} /users/me/fcm Remove all tokens
 * @apiName RemoveFCM
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiSuccess (Success 204) 204 No content.
 * @apiError 401 User access only.
 */
router.delete('/me/fcm',
  token({ required: true }),
  removeFCM);

export default router;
