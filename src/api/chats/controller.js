import { success, notFound } from '../../services/response/';
import { Chats } from '.';

export const create = ({ user, bodymen: { body } }, res, next) =>
  Chats.create({
    ...body,
    user
  })
    .then((chats) => chats.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Chats.count(query)
    .then(count => Chats.find(query, select, cursor)
      .then((chats) => ({
        count,
        rows: chats.map((chats) => chats.view())
      }))
    )
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Chats.findById(params.id)
    .then(notFound(res))
    .then((chats) => chats ? chats.view() : null)
    .then(success(res))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  Chats.findById(params.id)
    .then(notFound(res))
    .then((chats) => chats ? Object.assign(chats, body).save() : null)
    .then((chats) => chats ? chats.view(true) : null)
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Chats.findById(params.id)
    .then(notFound(res))
    .then((chats) => chats ? chats.remove() : null)
    .then(success(res, 204))
    .catch(next);
