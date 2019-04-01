import request from 'supertest';
import { apiRoot } from '../../config';
import { signSync } from '../../services/jwt';
import express from '../../services/express';
import { User } from '../user';
import routes, { Comment } from '.';
import { Post } from '../post';

const app = () => express(apiRoot, routes);

let userSession, anotherSession, comment, post;

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' });
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' });
  userSession = signSync(user.id);
  anotherSession = signSync(anotherUser.id);
  post = await Post.create({
    name: 'test',
    annotation: 'test',
    description: 'test',
    genre: [ 'test1', 'test2' ],
    type: 'test',
    rating: 5.1,
    status: 'test',
    date: 'test',
    author: 'test',
    cover: 'test',
    chapters: 'test',
    pages: 'test',
    reading: 'test',
    episodes: {
      1: [
        'first',
        'second'
      ]
    }
  });
  comment = await Comment.create({ post_id: post.id, body: 'sometext', user });
});

test('POST /comments 200 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, post_id: post.id, body: 'test' });
  expect(status).toBe(200);
  expect(typeof body).toEqual('object');
  expect(body.body).toEqual('test');
  expect(typeof body.user).toEqual('object');
});

test('POST /comments 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`);
  expect(status).toBe(401);
});

test('GET /comments/:post-id 200 (user)', async () => {
  await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, post_id: post.id, body: 'test' });

  const { status, body } = await request(app())
    .get(`${apiRoot}/${post.id}`)
    .query({ access_token: userSession });

  expect(status).toBe(200);
  expect(Array.isArray(body)).toBe(true);
  expect(typeof body[0].user).toEqual('object');
});

test('PUT /comments/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${comment.id}`)
    .send({ access_token: userSession, post_id: 'test', body: 'test' });
  expect(status).toBe(200);
  expect(typeof body).toEqual('object');
  expect(body.id).toEqual(comment.id);
  expect(body.post_id).toEqual('test');
  expect(body.body).toEqual('test');
  expect(body.rating).toEqual(0);
  expect(typeof body.user).toEqual('object');
});

test('PUT /comments/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${comment.id}`)
    .send({ access_token: anotherSession, post_id: 'test', body: 'test' });
  expect(status).toBe(401);
});

test('PUT /comments/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${comment.id}`);
  expect(status).toBe(401);
});

test('PUT /comments/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, post_id: 'test', body: 'test' });
  expect(status).toBe(404);
});

test('DELETE /comments/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${comment.id}`)
    .query({ access_token: userSession });
  expect(status).toBe(204);
});

test('DELETE /comments/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${comment.id}`)
    .send({ access_token: anotherSession });
  expect(status).toBe(401);
});

test('DELETE /comments/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${comment.id}`);
  expect(status).toBe(401);
});

test('DELETE /comments/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession });
  expect(status).toBe(404);
});
