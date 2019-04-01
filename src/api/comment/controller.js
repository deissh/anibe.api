/* eslint-disable no-return-await */
import { success, notFound, authorOrAdmin } from '../../services/response/';
import { Comment } from '.';
import { User } from '../user';
import { Notification } from '../notification';

export const create = ({ user, bodymen: { body } }, res, next) =>
  Comment.create({ ...body, user })
    .then((comment) => comment.view())
    .then(async (comment) => {
      const reply = comment.body.match(/^\w+,/);
      if (!reply) {
        return { userToNotif: null, comment };
      }

      return {
        userToNotif: await User.findOne({ name: reply[0].slice(0, -1) }),
        comment
      };
    })
    .then(async ({ userToNotif, comment }) => {
      if (!userToNotif) {
        return comment;
      }

      // у пользователя выключены уведомления
      if (!userToNotif.enablefcm) {
        return comment;
      }

      await Notification.create({
        title: 'Новый ответ',
        body: 'На ваш комментарий кто то недавно ответил',
        user,
        target: userToNotif.id,
        picture: user.picture,
        type: 'comment',
        url: `comments/${body.post_id}`
      });

      return comment;
    })
    .then(success(res, 200))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Comment.find(query, select, cursor)
    .populate('user')
    .then((comments) => comments.map(async (comment) => await comment.view()))
    .then(success(res))
    .catch(next);

export const show = ({ querymen: { cursor }, params }, res, next) =>
  Comment.find({ post_id: params.id }, null, cursor)
    .populate('user')
    .then(notFound(res))
    .then(async (comments) => await Promise.all(comments.map(async (comment) => await comment.view())))
    .then(success(res))
    .catch(next);

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Comment.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((comment) => comment ? Object.assign(comment, body).save() : null)
    .then(async (comment) => comment ? await comment.view(true) : null)
    .then(success(res))
    .catch(next);

export const destroy = ({ user, params }, res, next) =>
  Comment.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((comment) => comment ? comment.remove() : null)
    .then(success(res, 204))
    .catch(next);
