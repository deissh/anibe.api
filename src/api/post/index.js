import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import { token } from '../../services/passport';
import { create, index, show, update, destroy } from './controller';
import Post, { schema } from './model';
export {
  Post,
  schema
};

const router = new Router();
const { name, annotation, description, genre, type, rating, status, date, author, cover, chapters, pages, reading, episodes } = schema.tree;

/**
 * @api {post} /posts Create post
 * @apiName CreatePost
 * @apiGroup Post
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam {String} name Post's name.
 * @apiParam {String} annotation Post's annotation.
 * @apiParam {String} description Post's description.
 * @apiParam {Object} genre Post's genre.
 * @apiParam {String} type Post's type.
 * @apiParam {String} rating Post's rating.
 * @apiParam {String} status Post's status.
 * @apiParam {String} date Post's date.
 * @apiParam {String} author Post's author.
 * @apiParam {String} cover Post's cover.
 * @apiParam {String} chapters Post's chapters.
 * @apiParam {String} pages Post's pages.
 * @apiParam {String} reading Post's reading.
 * @apiParam episodes Post's episodes.
 * @apiSuccess {Object} post Post's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Post not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  // token({ required: true, roles: ['admin'] }),
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
  query({
    genre: [{
      type: String
    }],
    status: {
      String
    },
    type: String,
    rating: {
      type: Number
    }
  }),
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
 * @apiParam {String} name Post's name.
 * @apiParam {String} annotation Post's annotation.
 * @apiParam {String} description Post's description.
 * @apiParam genre Post's genre.
 * @apiParam {String} type Post's type.
 * @apiParam {String} rating Post's rating.
 * @apiParam {String} status Post's status.
 * @apiParam {String} date Post's date.
 * @apiParam {String} author Post's author.
 * @apiParam {String} cover Post's cover.
 * @apiParam {String} chapters Post's chapters.
 * @apiParam {String} pages Post's pages.
 * @apiParam {String} reading Post's reading.
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
