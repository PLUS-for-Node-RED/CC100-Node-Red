/*
 The MIT License

 Copyright (c) 2022-2024 - Iniationware GmbH (https://plus4nodered.com/)
 Copyright (c) 2022 - Klaus Landsdorf (https://bianco-royal.com/)
 All rights reserved.
 @plus4nodered/node-red-contrib-wago-cc100
 */

/* see http://mochajs.org/ */

'use strict'

const coreDigital = require('../../src/core/core-analog')

let assert = null
import('chai').then(chai => {
  assert = chai.assert
})

describe('Analog e2e', function () {

  describe('analog e2e input functions', function () {
    it('should do analog e2e input test', function (done) {
      assert.equal(1, 1)
      done()
    })
  })
})
