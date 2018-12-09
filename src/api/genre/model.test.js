import { Genre } from '.';

let genre;

beforeEach(async () => {
  genre = await Genre.create({ name: 'test', rating: 'test', visible: 'test' });
});

describe('view', () => {
  it('returns simple view', () => {
    const view = genre.view();
    expect(typeof view).toBe('object');
    expect(view.id).toBe(genre.id);
    expect(view.name).toBe(genre.name);
    expect(view.rating).toBe(genre.rating);
    expect(view.visible).toBe(genre.visible);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });

  it('returns full view', () => {
    const view = genre.view(true);
    expect(typeof view).toBe('object');
    expect(view.id).toBe(genre.id);
    expect(view.name).toBe(genre.name);
    expect(view.rating).toBe(genre.rating);
    expect(view.visible).toBe(genre.visible);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });
});
