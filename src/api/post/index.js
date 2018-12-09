import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import { token } from '../../services/passport';
import { create, index, show, update, destroy } from './controller';
import { schema } from './model';
export Post, { schema } from './model';

const router = new Router();
const { name, annotation, description, genre, type, rating, status, date, author, cover, chapters, pages, reading, episodes } = schema.tree;

/**
 * @api {post} /posts Create post
 * @apiName CreatePost
 * @apiGroup Post
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Post's name.
 * @apiParam annotation Post's annotation.
 * @apiParam description Post's description.
 * @apiParam genre Post's genre.
 * @apiParam type Post's type.
 * @apiParam rating Post's rating.
 * @apiParam status Post's status.
 * @apiParam date Post's date.
 * @apiParam author Post's author.
 * @apiParam cover Post's cover.
 * @apiParam chapters Post's chapters.
 * @apiParam pages Post's pages.
 * @apiParam reading Post's reading.
 * @apiParam episodes Post's episodes.
 * @apiSuccess {Object} post Post's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Post not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, annotation, description, genre, type, rating, status, date, author, cover, chapters, pages, reading, episodes }),
  create);

/**
 * @api {get} /posts Retrieve posts
 * @apiName RetrievePosts
 * @apiGroup Post
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of posts.
 * @apiSuccess {Object[]} rows List of posts.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index);

/**
 * @api {get} /posts/:id Retrieve post
 * @apiName RetrievePost
 * @apiGroup Post
 * @apiSuccess {Object} post Post's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Post not found.
 */
router.get('/:id',
  show);

/**
 * @api {put} /posts/:id Update post
 * @apiName UpdatePost
 * @apiGroup Post
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Post's name.
 * @apiParam annotation Post's annotation.
 * @apiParam description Post's description.
 * @apiParam genre Post's genre.
 * @apiParam type Post's type.
 * @apiParam rating Post's rating.
 * @apiParam status Post's status.
 * @apiParam date Post's date.
 * @apiParam author Post's author.
 * @apiParam cover Post's cover.
 * @apiParam chapters Post's chapters.
 * @apiParam pages Post's pages.
 * @apiParam reading Post's reading.
 * @apiParam episodes Post's episodes.
 * @apiSuccess {Object} post Post's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Post not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, annotation, description, genre, type, rating, status, date, author, cover, chapters, pages, reading, episodes }),
  update);

/**
 * @api {delete} /posts/:id Delete post
 * @apiName DeletePost
 * @apiGroup Post
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Post not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy);

export default router;
