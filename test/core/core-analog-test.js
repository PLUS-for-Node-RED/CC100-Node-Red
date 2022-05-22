/* see http://mochajs.org/ */

'use strict'

const coreDigital = require('../../src/core/core-analog')

const assert = require('chai').assert

describe('Analog', function () {

  describe('analog core input functions', function () {
    it('should have value zero on wrong analog input zero', function (done) {
      assert.equal(coreDigital.getNumberFromAnalogData(0), 0.00)
      done()
    })
    it('should have value one on analog input 5600', function (done) {
      assert.equal(coreDigital.getNumberFromAnalogData(5600), 1.00)
      done()
    })
  })
})