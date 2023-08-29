import { expect, test } from 'vitest'
import { sum } from './sum'

test('sum two numbers', () => {
    expect(sum(1, 2)).toBe(3)
    expect(sum(1, 2)).not.toBe(4)
})