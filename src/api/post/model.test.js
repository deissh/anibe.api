import { Post } from '.';

let post;

beforeEach(async () => {
  post = await Post.create({ name: 'test', annotation: 'test', description: 'test', genre: 'test', type: 'test', rating: 'test', status: 'test', date: 'test', author: 'test', cover: 'test', chapters: 'test', pages: 'test', reading: 'test', episodes: 'test' });
});

describe('view', () => {
  it('returns simple view', () => {
    const view = post.view();
    expect(typeof view).toBe('object');
    expect(view.id).toBe(post.id);
    expect(view.name).toBe(post.name);
    expect(view.annotation).toBe(post.annotation);
    expect(view.description).toBe(post.description);
    expect(view.genre).toBe(post.genre);
    expect(view.type).toBe(post.type);
    expect(view.rating).toBe(post.rating);
    expect(view.status).toBe(post.status);
    expect(view.date).toBe(post.date);
    expect(view.author).toBe(post.author);
    expect(view.cover).toBe(post.cover);
    expect(view.chapters).toBe(post.chapters);
    expect(view.pages).toBe(post.pages);
    expect(view.reading).toBe(post.reading);
    expect(view.episodes).toBe(post.episodes);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });

  it('returns full view', () => {
    const view = post.view(true);
    expect(typeof view).toBe('object');
    expect(view.id).toBe(post.id);
    expect(view.name).toBe(post.name);
    expect(view.annotation).toBe(post.annotation);
    expect(view.description).toBe(post.description);
    expect(view.genre).toBe(post.genre);
    expect(view.type).toBe(post.type);
    expect(view.rating).toBe(post.rating);
    expect(view.status).toBe(post.status);
    expect(view.date).toBe(post.date);
    expect(view.author).toBe(post.author);
    expect(view.cover).toBe(post.cover);
    expect(view.chapters).toBe(post.chapters);
    expect(view.pages).toBe(post.pages);
    expect(view.reading).toBe(post.reading);
    expect(view.episodes).toBe(post.episodes);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });
});
