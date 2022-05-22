/* see http://mochajs.org/ */

'use strict'

const assert = require('chai').assert

describe('Analog', function () {
  describe('analog core functions', function () {
    it('should test some core analog function', function (done) {
      assert.equal(-1, [1, 2, 3].indexOf(5))
      done()
    })
  })
})