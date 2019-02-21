import { News } from '.'

let news

beforeEach(async () => {
  news = await News.create({ title: 'test', body: 'test', author_id: 'test', preview: 'test', background: 'test', type: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = news.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(news.id)
    expect(view.title).toBe(news.title)
    expect(view.body).toBe(news.body)
    expect(view.author_id).toBe(news.author_id)
    expect(view.preview).toBe(news.preview)
    expect(view.background).toBe(news.background)
    expect(view.type).toBe(news.type)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = news.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(news.id)
    expect(view.title).toBe(news.title)
    expect(view.body).toBe(news.body)
    expect(view.author_id).toBe(news.author_id)
    expect(view.preview).toBe(news.preview)
    expect(view.background).toBe(news.background)
    expect(view.type).toBe(news.type)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
