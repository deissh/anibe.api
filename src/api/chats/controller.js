/* eslint-disable no-return-await */
import { success, notFound } from '../../services/response/';
import { Chats } from '.';

export const create = ({ user, bodymen: { body } }, res, next) =>
  Chats.create({
    ...body,
    users: [ user.id ]
  })
    .then(async (chats) => await chats.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ user, querymen: { query, select, cursor } }, res, next) =>
  Chats.count({ ...query, users: { $in: [ user.id ] } })
    .then(count => Chats.find({ ...query, users: { $in: [ user.id ] } }, select, cursor)
      .then(async (chats) => ({
        count,
        rows: await Promise.all(chats.map(async (chats) => await chats.view()))
      }))
    )
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Chats.findById(params.id)
    .then(notFound(res))
    .then(async (chats) => chats ? await chats.view() : null)
    .then(success(res))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  Chats.findById(params.id)
    .then(notFound(res))
    .then((chats) => chats ? Object.assign(chats, body).save() : null)
    .then(async (chats) => chats ? await chats.view() : null)
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Chats.findById(params.id)
    .then(notFound(res))
    .then((chats) => chats ? chats.remove() : null)
    .then(success(res, 204))
    .catch(next);
