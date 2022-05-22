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
      coreDigital.writeDigitalOutput(node, msg, DigOutPID, 'DigOutPID', do1)
    })
  }

  RED.nodes.registerType('Set-DO1', setDO1)

  // Set Digital Output 2
  function setDO2 (config) {
    RED.nodes.createNode(this, config)
    const node = this

    node.on('input', function (msg) {
      coreDigital.writeDigitalOutput(node, msg, DigOutPID, 'DigOutPID', do2)
    })
  }

  RED.nodes.registerType('Set-DO2', setDO2)

  // Set Digital Output 3
  function setDO3 (config) {
    RED.nodes.createNode(this, config)
    const node = this

    node.on('input', function (msg) {
      coreDigital.writeDigitalOutput(node, msg, DigOutPID, 'DigOutPID', do3)
    })
  }

  RED.nodes.registerType('Set-DO3', setDO3)

  // Set Digital Output 4
  function setDO4 (config) {
    RED.nodes.createNode(this, config)
    const node = this

    node.on('input', function (msg) {
      coreDigital.writeDigitalOutput(node, msg, DigOutPID, 'DigOutPID', do4)
    })
  }

  RED.nodes.registerType('Set-DO4', setDO4)

  // Read all Digital Outputs at once from file
  function readDO (config) {
    RED.nodes.createNode(this, config)
    const node = this

    node.on('input', function (msg) {
      coreDigital.readDigitalOutputs(node, DigOutPID, 'DigOutPID')
    })
  }

  RED.nodes.registerType('Read-DO', readDO)
}
