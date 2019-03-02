import { success, notFound, authorOrAdmin } from '../../services/response/';
import { Comment } from '.';
import { User } from '../user';
import { FCM } from '../../services/firebase';

export const create = ({ user, bodymen: { body } }, res, next) =>
  Comment.create({ ...body, user })
    .then((comment) => comment.view())
    .then(async (comment) => {
      const reply = comment.body.match(/^\w+,/);
      if (!reply) {
        return (null, comment);
      }

      return {
        user: await User.findOne({ name: reply[0].slice(0, -1) }),
        comment
      };
    })
    .then(({ user, comment }) => {
      if (!user) {
        return comment;
      }

      for (let token of user.fcm) {
        FCM.send({
          to: token,
          notification: {
            title: 'Новый ответ',
            body: 'На ваш комментарий кто то недавно ответили'
          },
          data: {
            url: `comments/${body.post_id}`,
            message: 'На ваш комментарий кто то недавно ответили'
          }
        }, (e, res) => e ? console.log(e) : '');
      }

      return comment;
    })
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
