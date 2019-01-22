import { success, notFound } from '../../services/response/';
import { Post } from '.';

export const create = ({ bodymen: { body } }, res, next) =>
  Post.create(body)
    .then((post) => post.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Post.count(query)
    .then(count => Post.find(query, select, cursor)
      .then((posts) => ({
        count,
        rows: posts.map((post) => post.view())
      }))
    )
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Post.findById(params.id)
    .then(notFound(res))
    .then((post) => post ? post.view(true) : null)
    .then(success(res))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  Post.findById(params.id)
    .then(notFound(res))
    .then((post) => post ? Object.assign(post, body).save() : null)
    .then((post) => post ? post.view(true) : null)
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Post.findById(params.id)
    .then(notFound(res))
    .then((post) => post ? post.remove() : null)
    .then(success(res, 204))
    .catch(next);

export const addToList = ({ bodymen: { body }, params, user }, res, next) =>
  Post.findById(params.id)
    .then(notFound(res))
    .then((post) => {
      // список разрешенных списков у пользователя
      const lists = ['favorite', 'thrown', 'inprogress', 'readed'];

      if (!lists.includes(body.status)) {
        res.status(400).json({
          valid: false,
          message: 'Status must be one of \'favorite\', \'thrown\', \'inprogress\', \'readed\''
        });
        return null;
      }

      if (user[body.status].indexOf(params.id) !== -1) {
        res.status(400).json({
          valid: false,
          message: 'Already contain this post'
        });
        return null;
      }

      return post;
    })
    .then(notFound(res))
    .then((post) => {
      if (post) {
        user[body.status].push(params.id);
        user.save();
      }

      return {};
    })
    .then(success(res, 201));

export const delFromList = ({ params, user }, res, next) =>
  Post.findById(params.id)
    .then(notFound(res))
    .then((post) => {
      const lists = ['favorite', 'thrown', 'inprogress', 'readed'];
      lists.forEach(i => {
        user[i] = user[i].filter((v) => {
          return v !== params.id;
        });
      });

      user.save();
      return {};
    })
    .then(success(res, 204));
