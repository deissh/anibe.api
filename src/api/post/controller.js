import { success, notFound, Failed } from '../../services/response/';
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
        return null;
      }

      return params.id;
    })
    .then(Failed(res, 400, 'Status must be one of \'favorite\', \'thrown\', \'inprogress\', \'readed\''))
    .then((id) => {
      if (id) {
        return user.update({
          '$pull': {
            favorite: id,
            thrown: id,
            inprogress: id,
            readed: id
          }
        });
      } else {
        return null;
      }
    })
    .then((pref) => {
      if (pref) {
        return user.update({
          '$push': {
            [body.status]: params.id
          }
        });
      } else {
        return null;
      }
    })
    .then((data) => {
      if (data) {
        return {};
      }
    })
    .then(success(res, 201))
    .catch(next);

export const delFromList = ({ params, user }, res, next) =>
  Post.findById(params.id)
    .then(notFound(res))
    .then(() => {
      return user.update({
        '$pull': {
          favorite: params.id,
          thrown: params.id,
          inprogress: params.id,
          readed: params.id
        }
      });
    })
    .then(success(res, 204))
    .catch(next);
