/*
 The MIT License

 Copyright (c) 2022-2024 - Iniationware GmbH (https://plus4nodered.com/)
 Copyright (c) 2022 - Klaus Landsdorf (https://bianco-royal.com/)
 All rights reserved.
 @plus4nodered/node-red-contrib-wago-cc100
 */

module.exports = function (RED) {
  const coreDigital = require('./core/core-digital')

  // Read all Digital Inputs at once
  function readDI (config) {
    const DigInPID = '/sys/devices/platform/soc/44009000.spi/spi_master/spi0/spi0.0/din'
    RED.nodes.createNode(this, config)
    const node = this

    node.on('input', function (msg) {
      coreDigital.readDigitalInputs(node, DigInPID, 'DigInPID')
    })
  }

  RED.nodes.registerType('CC100-Read-DI', readDI)
}
