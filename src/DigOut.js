/*
 The MIT License

 Copyright (c) 2022-2024 - Iniationware GmbH (https://plus4nodered.com/)
 Copyright (c) 2022 - Klaus Landsdorf (https://bianco-royal.com/)
 All rights reserved.
 @plus4nodered/node-red-contrib-wago-cc100
 */

module.exports = function (RED) {
  const coreDigital = require('./core/core-digital')
  const DigOutPID = '/sys/kernel/dout_drv/DOUT_DATA'

  const do1 = 1
  const do2 = 2
  const do3 = 4
  const do4 = 8

  // Set Digital Output 1
  function setDO1 (config) {
    RED.nodes.createNode(this, config)
    const node = this

    node.on('input', function (msg) {
      const ioWriteStructure = {
        ioPath: DigOutPID,
        ioName: 'DO01',
        ioValue: do1
      }

      coreDigital.writeDigitalOutput(node, msg, ioWriteStructure)
    })
  }

  RED.nodes.registerType('CC100-Set-DO1', setDO1)

  // Set Digital Output 2
  function setDO2 (config) {
    RED.nodes.createNode(this, config)
    const node = this

    node.on('input', function (msg) {
      const ioWriteStructure = {
        ioPath: DigOutPID,
        ioName: 'DO02',
        ioValue: do2
      }

      coreDigital.writeDigitalOutput(node, msg, ioWriteStructure)
    })
  }

  RED.nodes.registerType('CC100-Set-DO2', setDO2)

  // Set Digital Output 3
  function setDO3 (config) {
    RED.nodes.createNode(this, config)
    const node = this

    node.on('input', function (msg) {
      const ioWriteStructure = {
        ioPath: DigOutPID,
        ioName: 'DO03',
        ioValue: do3
      }

      coreDigital.writeDigitalOutput(node, msg, ioWriteStructure)
    })
  }

  RED.nodes.registerType('CC100-Set-DO3', setDO3)

  // Set Digital Output 4
  function setDO4 (config) {
    RED.nodes.createNode(this, config)
    const node = this

    node.on('input', function (msg) {
      const ioWriteStructure = {
        ioPath: DigOutPID,
        ioName: 'DO04',
        ioValue: do4
      }

      coreDigital.writeDigitalOutput(node, msg, ioWriteStructure)
    })
  }

  RED.nodes.registerType('CC100-Set-DO4', setDO4)

  // Read all Digital Outputs at once from file
  function readDO (config) {
    RED.nodes.createNode(this, config)
    const node = this

    node.on('input', function (msg) {
      coreDigital.readDigitalOutputs(node, DigOutPID, 'DigOutPID')
    })
  }

  RED.nodes.registerType('CC100-Read-DO', readDO)
}
