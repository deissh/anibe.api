import { success, notFound, authorOrAdmin } from '../../services/response/';
import { Comment } from '.';

export const create = ({ user, bodymen: { body } }, res, next) =>
  Comment.create({ ...body, user })
    .then((comment) => comment.view())
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Comment.find(query, select, cursor)
    .populate('user')
    .then((comments) => comments.map((comment) => comment.view()))
    .then(success(res))
    .catch(next);

export const show = ({ querymen: { cursor }, params }, res, next) =>
  Comment.find({ post_id: params.id }, null, cursor)
    .populate('user')
    .then(notFound(res))
    .then((comments) => comments.map((comment) => comment.view()))
    .then(success(res))
    .catch(next);

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Comment.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((comment) => comment ? Object.assign(comment, body).save() : null)
    .then((comment) => comment ? comment.view(true) : null)
    .then(success(res))
    .catch(next);

export const destroy = ({ user, params }, res, next) =>
  Comment.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((comment) => comment ? comment.remove() : null)
    .then(success(res, 204))
    .catch(next);
