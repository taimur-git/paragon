import { expect , test } from 'vitest'

import { createTagType} from './prisma'
test('createTagType', () => {
    expect(createTagType('test')).toBe(true)
    expect(createTagType('test')).toBe(false)
    //expect(testDummy()).toBe(undefined)
})