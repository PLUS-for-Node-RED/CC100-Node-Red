/* see http://mochajs.org/ */

'use strict'

const coreDigital = require('../../src/core/core-analog')

const assert = require('chai').assert

describe('Analog', function () {

  describe('analog core functions', function () {
    it('should have value check message with min and max', function (done) {
      assert.equal(coreDigital.isNotValidMessage(), 'Value not allowed, has to be >= 0 and <= 10')
      done()
    })
    it('should have value zero on wrong analog data zero', function (done) {
      assert.equal(coreDigital.getNumberFromAnalogData(0), 0.00)
      done()
    })
    it('should have value one on analog data 5600', function (done) {
      assert.equal(coreDigital.getNumberFromAnalogData(5600), 1.00)
      done()
    })
    it('should have value 1 on calculate voltage 335', function (done) {
      assert.equal(coreDigital.calculateVoltage(335), 1.00)
      done()
    })
    it('should have value 335 on calculate voltage raw 1', function (done) {
      assert.equal(coreDigital.calculateVoltageRaw(1), 335.00)
      done()
    })
  })

  describe('analog core input functions', function () {
    it('should have value check message with min and max', function (done) {
      assert.equal(coreDigital.isNotValidMessage(), 'Value not allowed, has to be >= 0 and <= 10')
      done()
    })
  })

  describe('analog core output functions', function () {
    it('should have value 1 on built analog output message for voltage 335', function (done) {
      const msg = coreDigital.buildAnalogOutputReadMessage(335)
      assert.equal(msg.payload, 1.00)
      done()
    })
  })
})