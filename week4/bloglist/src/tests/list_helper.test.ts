import { Blog } from '../types'
import { dummy } from '../utils/list_helper'

test('dummy returns one', () => {
  const blogs: Blog[] = []
  
  const result = dummy(blogs)
  expect(result).toBe(1)
})