import { mockNotes } from '../mockData'
import { getNotes } from './getNotes'

describe('getNotes', () => {
  const mockUrl = 'http://localhost:3000/api/v1/notes'

  window.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockNotes),
    })
  )

  it('should fetch using correct parameter', () => {
    getNotes(mockUrl)

    expect(window.fetch).toHaveBeenCalledWith(mockUrl)
  })

  it('should return mockData when fetch is successful', async () => {
    const result = await getNotes(mockUrl)

    await expect(result).toEqual(mockNotes)
  })

  it('should return error when fetch is unsuccessful', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false,
      })
    )

    await expect(getNotes(mockUrl)).rejects.toEqual(
      Error('Failed to fetch notes')
    )
  })
})
