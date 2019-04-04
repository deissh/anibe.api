import request from 'supertest';
import { apiRoot } from '../../config';
import { signSync } from '../../services/jwt';
import express from '../../services/express';
import { User } from '../user';
import routes, { Chats } from '.';

const app = () => express(apiRoot, routes);

let userSession, chats;

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' });
  userSession = signSync(user.id);
  chats = await Chats.create({});
});

test('POST /chats 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test', picture: 'test', users: 'test', lastmessage: 'test' });
  expect(status).toBe(201);
  expect(typeof body).toEqual('object');
  expect(body.name).toEqual('test');
  expect(body.picture).toEqual('test');
  expect(body.users).toEqual('test');
  expect(body.lastmessage).toEqual('test');
});

test('POST /chats 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`);
  expect(status).toBe(401);
});

test('GET /chats 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession });
  expect(status).toBe(200);
  expect(Array.isArray(body.rows)).toBe(true);
  expect(Number.isNaN(body.count)).toBe(false);
});

test('GET /chats 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`);
  expect(status).toBe(401);
});

test('GET /chats/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${chats.id}`)
    .query({ access_token: userSession });
  expect(status).toBe(200);
  expect(typeof body).toEqual('object');
  expect(body.id).toEqual(chats.id);
});

test('GET /chats/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${chats.id}`);
  expect(status).toBe(401);
});

test('GET /chats/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession });
  expect(status).toBe(404);
});

test('PUT /chats/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${chats.id}`)
    .send({ access_token: userSession, name: 'test', picture: 'test', users: 'test', lastmessage: 'test' });
  expect(status).toBe(200);
  expect(typeof body).toEqual('object');
  expect(body.id).toEqual(chats.id);
  expect(body.name).toEqual('test');
  expect(body.picture).toEqual('test');
  expect(body.users).toEqual('test');
  expect(body.lastmessage).toEqual('test');
});

test('PUT /chats/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${chats.id}`);
  expect(status).toBe(401);
});

test('PUT /chats/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, name: 'test', picture: 'test', users: 'test', lastmessage: 'test' });
  expect(status).toBe(404);
});

test('DELETE /chats/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${chats.id}`)
    .query({ access_token: userSession });
  expect(status).toBe(204);
});

test('DELETE /chats/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${chats.id}`);
  expect(status).toBe(401);
});

test('DELETE /chats/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession });
  expect(status).toBe(404);
});
