import { rest } from 'msw'

export const handlers = [
  // Mock a GET request to /users
  rest.get('/users', (req, res, ctx) => {
    // Return a list of mocked users
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ])
    )
  }),

  // Mock a POST request to /login
  rest.post('/login', (req, res, ctx) => {
    // Get the username and password from the request body
    const { username, password } = req.body

    // Validate the credentials
    if (username === 'admin' && password === 'secret') {
      // Return a success response with a token
      return res(
        ctx.status(200),
        ctx.json({ token: 'abc123' })
      )
    } else {
      // Return an error response
      return res(
        ctx.status(401),
        ctx.json({ message: 'Invalid credentials' })
      )
    }
  }),
]
