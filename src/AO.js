
module.exports = function (RED) {
  const coreAnalog = require('./core/core-analog')

  const AO1OnPID = '/sys/bus/iio/devices/iio:device0/out_voltage1_powerdown'
  const AO1PID = '/sys/bus/iio/devices/iio:device0/out_voltage1_raw'
  const AO2OnPID = '/sys/bus/iio/devices/iio:device1/out_voltage2_powerdown'
  const AO2PID = '/sys/bus/iio/devices/iio:device1/out_voltage2_raw'

  // Set Analog Output 1
  function setAO1 (config) {
    RED.nodes.createNode(this, config)
    const node = this

    node.on('input', function (msg) {
      const ioStructure = {
        ioPowerDown: {
          ioPath: AO1OnPID,
          ioName: 'AO1OnPID',
          ioValue: 0
        },
        ioRaw: {
          ioPath: AO1PID,
          ioName: 'AO1PID',
          ioValue: 0 // calculated value
        }
      }

      coreAnalog.setAnalogOutput(node, msg, ioStructure)
    })
  }

  RED.nodes.registerType('Set-AO1', setAO1)

  // Set Analog Output 2
  function setAO2 (config) {
    RED.nodes.createNode(this, config)
    const node = this

    node.on('input', function (msg) {
      const ioWriteStructure = {
        ioPowerDown: {
          ioPath: AO2OnPID,
          ioName: 'AO2OnPID',
          ioValue: 0
        },
        ioRaw: {
          ioPath: AO2PID,
          ioName: 'AO2PID',
          ioValue: 0 // calculated value
        }
      }

      coreAnalog.setAnalogOutput(node, msg, ioWriteStructure)
    })
  }

  RED.nodes.registerType('Set-AO2', setAO2)

  // Read Analog Outputs
  function readAO (config) {
    RED.nodes.createNode(this, config)
    const node = this

    node.on('input', function (msg) {
      const ioReadStructure = [
        {
          ioPath: AO1PID,
          ioName: 'AO1PID'
        },
        {
          ioPath: AO2PID,
          ioName: 'AO2PID'
        }
      ]

      coreAnalog.readAnalogOutputs(node, ioReadStructure)
    })
  }

  RED.nodes.registerType('Read-AO', readAO)
}
