const fs = require('fs')

const ANALOG_INPUT_MIN_VALUE = 0
const ANALOG_INPUT_MAX_VALUE = 10

module.exports = {
  // core analog functions to get them tested

  verboseMode: true,

  checkAnalogOutputValue (numberForAnalogInput) {
    return !Number.isNaN(numberForAnalogInput) &&
      numberForAnalogInput >= ANALOG_INPUT_MIN_VALUE &&
      numberForAnalogInput <= ANALOG_INPUT_MAX_VALUE
  },

  isNotValidMessage () {
    return 'Value not allowed, has to be >= ' + ANALOG_INPUT_MIN_VALUE +
      ' and <= ' + ANALOG_INPUT_MAX_VALUE
  },

  getNumberFromAnalogData (data) {
    const numberData = Number(data)
    const calculatedNumber = Math.round(numberData / 560) / 10.0
    return Number(calculatedNumber.toFixed(2))
  },

  readAnalogInput (node, ioToRead, ioName) {
    fs.readFile(ioToRead, function (err, data) {
      if (err) {
        node.error(err, 'Error while reading ' + ioName)
        node.status({ fill: 'red', shape: 'ring', text: 'Failed' })

        return console.log(err)
      } else {
        const msg = {
          payload: this.getNumberFromAnalogData(data)
        }

        node.status({ fill: 'green', shape: 'ring', text: 'OK' })
        return node.send(msg)
      }
    })
  },

  calculateVoltageRaw (voltage) {
    return Math.round(voltage * 335)
  },

  calculateVoltage (voltageRaw) {
    return Math.round(voltageRaw / 335)
  },

  writeAnalogOutput (node, msg, ioWriteStructure) {
    // Write the Analog Output Power Down
    fs.writeFile(ioWriteStructure.ioPowerDown.ioPath, String(ioWriteStructure.ioPowerDown.ioValue), function (err) {
      if (err) {
        node.error(err, 'Error while writing ' + ioWriteStructure.ioPowerDown.ioName)
        node.status({ fill: 'red', shape: 'ring', text: 'Failed' })
        return console.log(err)
      } else {
        // Write the Analog Output Raw
        fs.writeFile(ioWriteStructure.ioRaw.ioPath, String(ioWriteStructure.ioRaw.ioValue), function (err) {
          if (err) {
            node.error(err, 'Error while writing ' + ioWriteStructure.ioRaw.ioName)
            node.status({ fill: 'red', shape: 'ring', text: 'Failed' })
            return console.log(err)
          } else {
            node.status({ fill: 'green', shape: 'ring', text: 'OK' })
            return node.send(msg)
          }
        })
      }
    })
  },

  setAnalogOutput (node, msg, ioWriteStructure) {
    const voltage = Number(msg.payload)

    if (this.checkAnalogOutputValue(voltage)) {
      ioWriteStructure.ioRaw.ioValue = this.calculateVoltageRaw(voltage)
      this.writeAnalogOutput(node, msg, ioWriteStructure)
    } else {
      if (this.verboseMode) {
        console.log(this.isNotValidMessage())
      }
      node.status({ fill: 'red', shape: 'ring', text: 'Failed' })
    }
  },

  readAnalogOutput (node, ioPath, ioName) {
    fs.readFile(ioPath, function (err, data) {
      if (err) {
        node.error(err, 'Error while reading ' + ioName)
        node.status({ fill: 'red', shape: 'ring', text: 'Failed' })

        return console.log(err)
      } else {
        const valueNumber = this.calculateVoltage(Number(data))
        const msg = {
          payload: valueNumber.toFixed(2)
        }

        node.status({ fill: 'green', shape: 'ring', text: 'OK' })
        return node.send(msg)
      }
    })
  },

  readAnalogOutputs (node, ioReadStructure) {
    const coreAnalogInternal = this

    const msgPort01 = { payload: 0 }
    const msgPort02 = { payload: 0 }

    fs.readFile(ioReadStructure[0].ioPath, function (err, data) {
      if (err) {
        node.error(err, 'Error while reading ' + ioReadStructure[0].ioName)
        node.status({ fill: 'red', shape: 'ring', text: 'Failed' })

        return console.log(err)
      } else {
        const valueNumber = coreAnalogInternal.calculateVoltage(Number(data))
        msgPort01.payload = valueNumber.toFixed(2)

        fs.readFile(ioReadStructure[1].ioPath, function (err, data) {
          if (err) {
            node.error(err, 'Error while reading ' + ioReadStructure[1].ioName)
            node.status({ fill: 'red', shape: 'ring', text: 'Failed' })
            return console.log(err)
          } else {
            const valueNumber = coreAnalogInternal.calculateVoltage(Number(data))
            msgPort02.payload = valueNumber.toFixed(2)

            return node.send([msgPort01, msgPort02])
          }
        })
      }
    })
  }
}
