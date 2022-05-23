const fs = require('fs')

const ANALOG_INPUT_MIN_VOLTAGE_VALUE = 0
const ANALOG_INPUT_MAX_VOLTAGE_VALUE = 10

module.exports = {
  // core analog functions to get them tested

  verboseMode: true,

  checkAnalogOutputValue (numberForAnalogInput) {
    return !Number.isNaN(numberForAnalogInput) &&
      numberForAnalogInput >= ANALOG_INPUT_MIN_VOLTAGE_VALUE &&
      numberForAnalogInput <= ANALOG_INPUT_MAX_VOLTAGE_VALUE
  },

  isNotValidMessage () {
    return 'Value not allowed, has to be >= ' + ANALOG_INPUT_MIN_VOLTAGE_VALUE +
      ' and <= ' + ANALOG_INPUT_MAX_VOLTAGE_VALUE
  },

  getNumberFromAnalogData (data) { // TODO: better describing name?
    const numberData = Number(data)
    const calculatedNumber = Math.round(numberData / 560) / 10.0 // TODO: name values what it is: factor or a better naming?
    return Number(calculatedNumber.toFixed(2))
  },

  buildAnalogInputReadMessage (ioBufferData, ioName) {
    const valueNumber = this.getNumberFromAnalogData(ioBufferData)
    return {
      payload: valueNumber,
      topic: ioName
    }
  },

  readAnalogInput (node, ioToRead, ioName) {
    const coreAnalogInternal = this

    fs.readFile(ioToRead, function (err, ioBufferData) {
      if (err) {
        node.error(err, 'Error while reading ' + ioName)
        node.status({ fill: 'red', shape: 'ring', text: 'Failed' })

        return console.log(err)
      } else {
        node.status({ fill: 'green', shape: 'ring', text: 'OK' })

        return node.send(coreAnalogInternal.buildAnalogInputReadMessage(ioBufferData, ioName))
      }
    })
  },

  calculateVoltageRaw (voltage) {
    return Math.round(voltage * 335) // TODO: name 335 what it is: factor or a better naming?
  },

  calculateVoltage (voltageRaw) {
    return Math.round(voltageRaw / 335) // TODO: name 335 what it is: factor or a better naming?
  },

  writeAnalogOutput (node, msg, ioWriteStructure) {
    // TODO: is the ioWriteStructure naming correct? (ioPowerDown, ioRaw)

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

            // TODO: really sending of the incoming msg object
            return node.send(msg)
          }
        })
      }
    })
  },

  setAnalogOutput (node, msg, ioWriteStructure) {
    const coreAnalogInternal = this

    const voltage = Number(msg.payload) // TODO: is the naming correct here with voltage?

    if (coreAnalogInternal.checkAnalogOutputValue(voltage)) {
      ioWriteStructure.ioRaw.ioValue = coreAnalogInternal.calculateVoltageRaw(voltage)
      coreAnalogInternal.writeAnalogOutput(node, msg, ioWriteStructure)
    } else {
      node.warn(coreAnalogInternal.isNotValidMessage())
      node.status({ fill: 'red', shape: 'ring', text: 'Failed' })
    }
  },

  buildAnalogOutputReadMessage (ioBufferData, ioName) {
    const valueNumber = this.calculateVoltage(Number(ioBufferData))
    return {
      payload: valueNumber.toFixed(2),
      topic: ioName
    }
  },

  readAnalogOutput (node, ioPath, ioName) {
    const coreAnalogInternal = this

    fs.readFile(ioPath, function (err, ioBufferData) {
      if (err) {
        node.error(err, 'Error while reading ' + ioName)
        node.status({ fill: 'red', shape: 'ring', text: 'Failed' })

        return console.log(err)
      } else {
        node.status({ fill: 'green', shape: 'ring', text: 'OK' })

        return node.send(coreAnalogInternal.buildAnalogOutputReadMessage(ioBufferData, ioName))
      }
    })
  },

  readAnalogOutputs (node, ioReadStructure) {
    const coreAnalogInternal = this

    const msgPort01 = { payload: 0 }
    const msgPort02 = { payload: 0 }

    fs.readFile(ioReadStructure[0].ioPath, function (err, ioBufferData1) {
      if (err) {
        node.error(err, 'Error while reading ' + ioReadStructure[0].ioName)
        node.status({ fill: 'red', shape: 'ring', text: 'Failed' })

        return console.log(err)
      } else {
        const valueNumber = coreAnalogInternal.calculateVoltage(Number(ioBufferData1))
        msgPort01.payload = valueNumber.toFixed(2)

        fs.readFile(ioReadStructure[1].ioPath, function (err, ioBufferData2) {
          if (err) {
            node.error(err, 'Error while reading ' + ioReadStructure[1].ioName)
            node.status({ fill: 'red', shape: 'ring', text: 'Failed' })

            return console.log(err)
          } else {
            const valueNumber = coreAnalogInternal.calculateVoltage(Number(ioBufferData2))
            msgPort02.payload = valueNumber.toFixed(2)

            node.status({ fill: 'green', shape: 'ring', text: 'OK' })
            return node.send([msgPort01, msgPort02])
          }
        })
      }
    })
  }
}
