import { success, notFound } from '../../services/response/';
import { Report } from '.';

export const create = ({ user, bodymen: { body } }, res, next) =>
  Report.create({ ...body, user })
    .then((report) => report.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Report.countDocuments(query)
    .then(count => Report.find(query, select, cursor)
      .populate('user')
      .then((reports) => ({
        count,
        rows: reports.map((report) => report.view())
      }))
    )
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Report.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((report) => report ? report.view() : null)
    .then(success(res))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  Report.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((report) => report ? Object.assign(report, body).save() : null)
    .then((report) => report ? report.view(true) : null)
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Report.findById(params.id)
    .then(notFound(res))
    .then((report) => report ? report.remove() : null)
    .then(success(res, 204))
    .catch(next);
