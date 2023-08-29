import { expect , test } from 'vitest'

import { seedData , testDummy} from './seed'
test('testDummy', () => {
    expect(testDummy()).toBe(undefined)
})
/*
test('seedData', async () => {
    const response = await fetch('/api/seedData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: 1,
            adId: 1
        })
    })
    expect(response.status).toBe(201)
    }
)*/