import { describe } from 'mocha'
import { strictEqual } from 'assert'
import { sum } from '../src/utils/arithmetic.js'

describe('arithmetic functions should work', () => {
  strictEqual(sum(2, 3), 5, 'fail summation')
})
