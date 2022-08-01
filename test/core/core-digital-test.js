/*
 The MIT License

 Copyright (c) 2022 - Klaus Landsdorf (http://node-red.plus/)
 All rights reserved.
 @node-red-plus/node-red-contrib-wago-cc100
 */

/* see http://mochajs.org/ */

'use strict'

const coreDigital = require('../../src/core/core-digital')

const assert = require('chai').assert

describe('Digital', function () {

  describe('digital core input functions', function () {
    it('should have value zero on wrong digital input zero', function (done) {
      assert.equal(coreDigital.getDigitalInputValue(0), 0)
      done()
    })
    it('should have value zero on wrong digital input nine', function (done) {
      assert.equal(coreDigital.getDigitalInputValue(9), 0)
      done()
    })
    it('should have value one on digital input one', function (done) {
      assert.equal(coreDigital.getDigitalInputValue(1), 1)
      done()
    })
    it('should have value two on digital input two', function (done) {
      assert.equal(coreDigital.getDigitalInputValue(2), 2)
      done()
    })
    it('should have value four on digital input three', function (done) {
      assert.equal(coreDigital.getDigitalInputValue(3), 4)
      done()
    })
    it('should have value eight on digital input four', function (done) {
      assert.equal(coreDigital.getDigitalInputValue(4), 8)
      done()
    })
    it('should have value sixteen on digital input five', function (done) {
      assert.equal(coreDigital.getDigitalInputValue(5), 16)
      done()
    })
    it('should have value thirty-two on digital input six', function (done) {
      assert.equal(coreDigital.getDigitalInputValue(6), 32)
      done()
    })
    it('should have value sixty-four on digital input seven', function (done) {
      assert.equal(coreDigital.getDigitalInputValue(7), 64)
      done()
    })
    it('should have value one-hundred-twenty-eight on digital input eight', function (done) {
      assert.equal(coreDigital.getDigitalInputValue(8), 128)
      done()
    })
  })

  describe('digital core output functions', function () {
    it('should have value zero on wrong digital output zero', function (done) {
      assert.equal(coreDigital.getDigitalOutputValue(0), 0)
      done()
    })
    it('should have value zero on wrong digital output nine', function (done) {
      assert.equal(coreDigital.getDigitalOutputValue(5), 0)
      done()
    })
    it('should have value one on digital output one', function (done) {
      assert.equal(coreDigital.getDigitalOutputValue(1), 1)
      done()
    })
    it('should have value two on digital output two', function (done) {
      assert.equal(coreDigital.getDigitalOutputValue(2), 2)
      done()
    })
    it('should have value four on digital output three', function (done) {
      assert.equal(coreDigital.getDigitalOutputValue(3), 4)
      done()
    })
    it('should have value eight on digital output four', function (done) {
      assert.equal(coreDigital.getDigitalOutputValue(4), 8)
      done()
    })
  })
})
