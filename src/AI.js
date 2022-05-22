
module.exports = function (RED) {
  const coreAnalog = require('./core/core-analog')

  // Read Analog Input 1
  function readAI1 (config) {
    const AI1PID = '/sys/bus/iio/devices/iio:device3/in_voltage3_raw'

    RED.nodes.createNode(this, config)
    const node = this
    node.on('input', function (msg) {
      coreAnalog.readAnalogInput(node, AI1PID, 'AI1PID')
    })
  }

  RED.nodes.registerType('Read-AI1', readAI1)

  // Read Analog Input 2
  function readAI2 (config) {
    const AI2PID = '/sys/bus/iio/devices/iio:device3/in_voltage0_raw'

    RED.nodes.createNode(this, config)
    const node = this
    node.on('input', function (msg) {
      coreAnalog.readAnalogInput(node, AI2PID, 'AI2PID')
    })
  }

  RED.nodes.registerType('Read-AI2', readAI2)
}
