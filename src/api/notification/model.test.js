import { Notification } from '.'

let notification

beforeEach(async () => {
  notification = await Notification.create({ title: 'test', body: 'test', type: 'test', picture: 'test', url: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = notification.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(notification.id)
    expect(view.title).toBe(notification.title)
    expect(view.body).toBe(notification.body)
    expect(view.type).toBe(notification.type)
    expect(view.picture).toBe(notification.picture)
    expect(view.url).toBe(notification.url)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = notification.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(notification.id)
    expect(view.title).toBe(notification.title)
    expect(view.body).toBe(notification.body)
    expect(view.type).toBe(notification.type)
    expect(view.picture).toBe(notification.picture)
    expect(view.url).toBe(notification.url)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
