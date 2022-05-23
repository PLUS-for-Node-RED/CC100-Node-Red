/* see http://mochajs.org/ */

'use strict'

const corePlatinum = require('../../src/core/core-platinum')

const assert = require('chai').assert

describe('Platinum', function () {

  describe('platinum core input functions', function () {
    it('should have scale zero', function (done) {
      assert.equal(corePlatinum.getPlatinumScale(0), 0)
      done()
    })
    it('should have scale thirty-seven', function (done) {
      assert.equal(corePlatinum.getPlatinumScale(610), 37)
      done()
    })
    it('should have scale forty-three', function (done) {
      assert.equal(corePlatinum.getPlatinumScale(3610), 43)
      done()
    })
    it('should have platinum value', function (done) {
      const temperature = corePlatinum.calculatePlatinumValue(15700)
      assert.equal(temperature.toFixed(2), 99.62)
      done()
    })
  })
})