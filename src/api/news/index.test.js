import request from 'supertest';
import { apiRoot } from '../../config';
import { signSync } from '../../services/jwt';
import express from '../../services/express';
import { User } from '../user';
import routes, { News } from '.';

const app = () => express(apiRoot, routes);

let userSession, adminSession, news;

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' });
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' });
  userSession = signSync(user.id);
  adminSession = signSync(admin.id);
  news = await News.create({
    title: 'Test news',
    annotation: 'some short description',
    body: 'some righ text',
    author_id: 'Anon',
    preview: 'https://cdn.anibe.ru/avatarts/someuser/picture.png',
    background: 'https://cdn.anibe.ru/avatarts/someuser/picture2.png',
    type: 'Приложение'
  });
});

test('POST /news 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({
      access_token: adminSession,
      title: 'Test news v2',
      annotation: 'some short description',
      body: 'some righ text',
      author_id: 'Anon',
      preview: 'https://cdn.anibe.ru/avatarts/someuser/picture.png',
      background: 'https://cdn.anibe.ru/avatarts/someuser/picture2.png',
      type: 'Приложение'
    });

  expect(status).toBe(201);
  expect(typeof body).toEqual('object');
  expect(body.title).toEqual('Test news v2');
  expect(body.body).toEqual('some righ text');
  expect(body.annotation).toEqual('some short description');
  expect(body.author_id).toEqual('Anon');
  expect(body.preview).toEqual('https://cdn.anibe.ru/avatarts/someuser/picture.png');
  expect(body.background).toEqual('https://cdn.anibe.ru/avatarts/someuser/picture2.png');
  expect(body.type).toEqual('Приложение');
});

test('POST /news 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession });
  expect(status).toBe(401);
});

test('POST /news 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`);
  expect(status).toBe(401);
});

test('GET /news 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`);
  expect(status).toBe(200);
  expect(Array.isArray(body.rows)).toBe(true);
  expect(Number.isNaN(body.count)).toBe(false);
});

test('GET /news/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${news.id}`);
  expect(status).toBe(200);
  expect(typeof body).toEqual('object');
  expect(body.id).toEqual(news.id);
});

test('GET /news/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456');
  expect(status).toBe(404);
});

test('PUT /news/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${news.id}`)
    .send({
      access_token: adminSession,
      title: 'Test news v2',
      annotation: 'some short description',
      body: 'some righ text',
      author_id: 'Anon',
      preview: 'https://cdn.anibe.ru/avatarts/someuser/picture.png',
      background: 'https://cdn.anibe.ru/avatarts/someuser/picture2.png',
      type: 'Приложение'
    });
  expect(status).toBe(200);
  expect(typeof body).toEqual('object');
  expect(body.title).toEqual('Test news v2');
  expect(body.body).toEqual('some righ text');
  expect(body.annotation).toEqual('some short description');
  expect(body.author_id).toEqual('Anon');
  expect(body.preview).toEqual('https://cdn.anibe.ru/avatarts/someuser/picture.png');
  expect(body.background).toEqual('https://cdn.anibe.ru/avatarts/someuser/picture2.png');
  expect(body.type).toEqual('Приложение');
});

test('PUT /news/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${news.id}`)
    .send({ access_token: userSession });
  expect(status).toBe(401);
});

test('PUT /news/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${news.id}`);
  expect(status).toBe(401);
});

test('PUT /news/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/news/123456789098765432123456')
    .send({ access_token: adminSession, title: 'test', body: 'test', author_id: 'test', preview: 'test', background: 'test', type: 'test' });
  expect(status).toBe(404);
});

test('DELETE /news/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${news.id}`)
    .query({ access_token: adminSession });
  expect(status).toBe(204);
});

test('DELETE /news/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${news.id}`)
    .query({ access_token: userSession });
  expect(status).toBe(401);
});

test('DELETE /news/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${news.id}`);
  expect(status).toBe(401);
});

test('DELETE /news/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession });
  expect(status).toBe(404);
});
