import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// Create the mock server using the handlers
export const server = setupServer(...handlers)
