/* eslint-disable no-return-await */
import { success, notFound, authorOrAdmin } from '../../services/response/';
import { Messages } from '.';
import { Chats } from '../chats';

export const create = ({ user, bodymen: { body }, params }, res, next) =>
  Chats.findById(params.id)
    .then((chat) => {
      if (!chat.users.includes(user.id)) {
        return;
      }
      return chat;
    })
    .then(notFound(res))
    .then((chat) => Messages.create({ ...body, user, chat_id: chat.id }))
    .then(async (messages) => await messages.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor }, params }, res, next) =>
  Messages.count({
    ...query,
    chat_id: params.id
  })
    .then(count => Messages.find({ ...query, chat_id: params.id }, select, cursor)
      .populate('user')
      .then(async (messages) => ({
        count,
        rows: await Promise.all(messages.map(async (messages) => await messages.view()))
      }))
    )
    .then(success(res))
    .catch(next);

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Messages.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((messages) => messages ? Object.assign(messages, body).save() : null)
    .then(async (messages) => messages ? await messages.view(true) : null)
    .then(success(res))
    .catch(next);

export const destroy = ({ user, params }, res, next) =>
  Messages.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then(async (messages) => messages ? await messages.remove() : null)
    .then(success(res, 204))
    .catch(next);
