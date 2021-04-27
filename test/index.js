const { describe } = require('mocha')
const { strictEqual } = require('assert')
const { sum } = require('../utils/arithmetic')

describe('arithmetic functions should work', () => {
  strictEqual(sum(2, 3), 5, 'fail summation')
})
