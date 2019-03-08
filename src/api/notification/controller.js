/* eslint-disable no-return-await */
import { success } from '../../services/response/';
import { Notification } from '.';

export const create = ({ bodymen: { body }, user }, res, next) =>
  Notification.create({ ...body, user })
    .then((notification) => notification.view())
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor }, user }, res, next) =>
  Notification.countDocuments({ target: user.id })
    .then(count => Notification.find({ target: user.id }, select, cursor)
      .then(list => ({
        count,
        rows: list.map((notif) => notif.view())
      }))
    )
    .then(success(res))
    .catch(next);
