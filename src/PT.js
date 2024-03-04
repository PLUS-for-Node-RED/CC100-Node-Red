/*
 The MIT License

 Copyright (c) 2022-2024 - Iniationware GmbH (https://plus4nodered.com/)
 Copyright (c) 2022 - Klaus Landsdorf (https://bianco-royal.com/)
 All rights reserved.
 @plus4nodered/node-red-contrib-wago-cc100
 */

module.exports = function (RED) {
  const corePlatinum = require('./core/core-platinum')

  const PT1PID = '/sys/bus/iio/devices/iio:device2/in_voltage13_raw'
  const PT2PID = '/sys/bus/iio/devices/iio:device2/in_voltage1_raw'

  // Read PT1000 Input 1
  function readPT1 (config) {
    RED.nodes.createNode(this, config)
    const node = this

    node.on('input', function (msg) {
      corePlatinum.readPlatinumInput(node, msg, PT1PID, 'PT1PID')
    })
  }

  RED.nodes.registerType('CC100-Read-PT1', readPT1)

  // Read PT1000 Input 2
  function readPT2 (config) {
    RED.nodes.createNode(this, config)
    const node = this

    node.on('input', function (msg) {
      corePlatinum.readPlatinumInput(node, msg, PT2PID, 'PT2PID')
    })
  }

  RED.nodes.registerType('CC100-Read-PT2', readPT2)
}
