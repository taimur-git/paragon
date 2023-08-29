import { test, expect } from 'vitest'

test('get users', async () => {
  // Make a GET request to /users
  const response = await fetch('/users')
  // Expect the response status to be 200
  expect(response.status).toBe(200)
  // Expect the response body to be a JSON array of users
  const users = await response.json()
  expect(users).toEqual([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ])
})

test('login with valid credentials', async () => {
  // Make a POST request to /login with valid credentials
  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: 'admin',
      password: 'secret',
    }),
  })
  // Expect the response status to be 200
  expect(response.status).toBe(200)
  // Expect the response body to be a JSON object with a token
  const data = await response.json()
  expect(data).toEqual({ token: 'abc123' })
})

test('login with invalid credentials', async () => {
  // Make a POST request to /login with invalid credentials
  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: 'user',
      password: 'wrong',
    }),
  })
  // Expect the response status to be 401
  expect(response.status).toBe(401)
  // Expect the response body to be a JSON object with a message
  const data = await response.json()
  expect(data).toEqual({ message: 'Invalid credentials' })
})
