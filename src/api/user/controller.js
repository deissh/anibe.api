/* eslint-disable no-return-await */
import { success, notFound } from '../../services/response/';
import { User } from '.';
import { sign } from '../../services/jwt';
import { cdnUrl } from '../../config';
import { Post } from '../post';

import raccoon from 'raccoon';
import { Types } from 'mongoose';

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  User.countDocuments(query)
    .then(count => User.find(query, select, cursor)
      .then(async users => await Promise.all(users.map(async (user) => await user.view())))
      .then(users => ({
        rows: users,
        count
      }))
    )
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then(async (user) => user ? await user.view() : null)
    .then(success(res))
    .catch(next);

export const showByName = ({ params }, res, next) =>
  User.findOne({ name: params.name })
    .then(notFound(res))
    .then(async (user) => user ? await user.view() : null)
    .then(success(res))
    .catch(next);

export const showMe = async ({ user }, res) =>
  res.json(await user.view(true));

export const create = ({ bodymen: { body } }, res, next) =>
  User.create(body)
    .then(user => {
      sign(user.id)
        .then(async (token) => ({ token, user: await user.view(true) }))
        .then(success(res, 201));
    })
    .catch((err) => {
      /* istanbul ignore else */
      if (err.name === 'MongoError' && err.code === 11000) {
        res.status(409).json({
          valid: false,
          param: 'email',
          message: 'email already registered'
        });
      } else {
        next(err);
      }
    });

export const update = ({ bodymen: { body }, params, user }, res, next) =>
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null;
      const isAdmin = user.role === 'admin';
      const isSelfUpdate = user.id === result.id;
      if (!isSelfUpdate && !isAdmin) {
        res.status(401).json({
          valid: false,
          message: 'You can\'t change other user\'s data'
        });
        return null;
      }
      return result;
    })
    .then((user) => user ? Object.assign(user, body).save() : null)
    .then(async (user) => user ? await user.view(true) : null)
    .then(success(res))
    .catch(next);

export const updateAvatar = ({ user, file }, res, next) =>
  User.findById(user.id)
    .then(notFound(res))
    .then((user) => {
      user.picture = `${cdnUrl}/${file.key}`;
      return user.save();
    })
    .then(async (user) => user ? await user.view(true) : null)
    .then(success(res))
    .catch(next);

export const updatePassword = ({ bodymen: { body }, params, user }, res, next) =>
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null;
      const isSelfUpdate = user.id === result.id;
      if (!isSelfUpdate) {
        res.status(401).json({
          valid: false,
          param: 'password',
          message: 'You can\'t change other user\'s password'
        });
        return null;
      }
      return result;
    })
    .then((user) => user ? user.set({ password: body.password }).save() : null)
    .then(async (user) => user ? await user.view(true) : null)
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.remove() : null)
    .then(success(res, 204))
    .catch(next);

export const badges = ({ bodymen: { body }, params, user }, res, next) =>
  User.findById(params.id === 'me' ? user.id : params.id)
    .then((result) => {
      user.badges = body.badges;
      return user.save();
    })
    .then(success(res, 201))
    .catch(next);

// warning: Old, not long support
export const offer = ({ querymen: { query, select, cursor }, user }, res, next) =>
  (async () => user)()
    .then(notFound(res))
    .then(() => {
      if (user.favorite === []) {
        return null;
      }
      return user;
    })
    .then(() => {
      let genres = [];

      for (const post of user.favorite) {
        genres = genres.concat(post.genre);
      }

      return Post.find({ ...query, genre: { $in: [...new Set(genres)] } }, select, cursor);
    })
    .then(posts => posts.map((post) => post.view()))
    .then(posts => {
      return {
        count: posts.length,
        rows: posts
      };
    })
    .then(success(res))
    .catch(next);

export const addFCM = ({ bodymen: { body }, user }, res, next) =>
  (async () => user)()
    .then(notFound(res))
    .then(user => {
      return user.update({
        '$push': {
          fcm: body.token
        }
      });
    })
    .then(success(res, 204))
    .catch(next);

export const updateFCM = ({ bodymen: { body }, user }, res, next) =>
  (async () => user)()
    .then(notFound(res))
    .then(() => {
      return user.update({
        '$pull': {
          fcm: body.old
        }
      });
    })
    .then(() => {
      return user.update({
        '$push': {
          fcm: body.new
        }
      });
    })
    .then(success(res, 204))
    .catch(next);

export const removeFCM = ({ user }, res, next) =>
  (async () => user)()
    .then(notFound(res))
    .then(user => {
      return user.update({
        fcm: []
      });
    })
    .then(success(res, 204))
    .catch(next);

export const recommendations = ({ user }, res, next) =>
  (async () => user)()
    .then(notFound(res))
    .then(() => raccoon.recommendFor(user.id, 25))
    .then((ids) => ids.map((v) => Types.ObjectId(v)))
    .then((ids) => {
      return Post.find({
        _id: { $in: ids }
      });
    })
    .then((posts) => posts.map((post) => post.view()))
    .then((rows) => {
      return {
        count: rows.length,
        rows
      };
    })
    .then(success(res))
    .catch(next);
