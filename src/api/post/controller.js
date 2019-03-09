import { success, notFound, Failed } from '../../services/response/';
import { Post } from '.';

import raccoon from 'raccoon';

export const create = ({ bodymen: { body } }, res, next) =>
  Post.create(body)
    .then((post) => post.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Post.countDocuments(query)
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
      const lists = ['favorite', 'thrown', 'inprogress', 'readed', 'willread'];

      if (!lists.includes(body.status)) {
        return null;
      }

      return post;
    })
    .then(Failed(res, 400, 'Status must be one of \'favorite\', \'thrown\', \'inprogress\', \'readed\', \'willread\''))
    .then((post) => {
      if (post) {
        return user.update({
          '$pull': {
            favorite: { id: post.id },
            thrown: { id: post.id },
            inprogress: { id: post.id },
            readed: { id: post.id },
            willread: { id: post.id }
          }
        });
      } else {
        return null;
      }
    })
    .then((data) => data ? Post.findById(params.id) : null)
    .then((post) => {
      if (post) {
        return user.update({
          '$push': {
            [body.status]: post.view(false)
          }
        });
      } else {
        return null;
      }
    })
    .then(async (data) => {
      // убираем любые оценки для этой манги
      await raccoon.unliked(user.id, params.id);
      await raccoon.undisliked(user.id, params.id);

      return data;
    })
    .then(async (data) => {
      // добавляем в лайки или в дизлайки в зависимости от статуса
      switch (body.status) {
      case 'favorite':
        console.log(user.id, params.id);

        await raccoon.liked(user.id, params.id);
        break;
      case 'thrown':
        await raccoon.disliked(user.id, params.id);
        break;
      default:
        break;
      }

      return data;
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
    .then((post) => {
      return user.update({
        '$pull': {
          favorite: { id: post.id },
          thrown: { id: post.id },
          inprogress: { id: post.id },
          readed: { id: post.id },
          willread: { id: post.id }
        }
      });
    })
    .then(async (data) => {
      // убираем любые оценки для этой манги
      await raccoon.unliked(user.id, params.id);
      await raccoon.undisliked(user.id, params.id);

      return data;
    })
    .then(success(res, 204))
    .catch(next);
