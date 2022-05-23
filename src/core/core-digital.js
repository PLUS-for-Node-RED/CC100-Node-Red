const fs = require('fs')

const di1 = 1
const di2 = 2
const di3 = 4
const di4 = 8
const di5 = 16
const di6 = 32
const di7 = 64
const di8 = 128

const do1 = 1
const do2 = 2
const do3 = 4
const do4 = 8

module.exports = {

  // core digital functions to get them tested

  verboseMode: true,

  lockReadWrite: false,

  getDigitalInputValue (inputNumber) {
    switch (inputNumber) {
      case 1:
        return di1
      case 2:
        return di2
      case 3:
        return di3
      case 4:
        return di4
      case 5:
        return di5
      case 6:
        return di6
      case 7:
        return di7
      case 8:
        return di8

      default:
        return 0
    }
  },

  getDigitalOutputValue (outputNumber) {
    switch (outputNumber) {
      case 1:
        return do1
      case 2:
        return do2
      case 3:
        return do3
      case 4:
        return do4

      default:
        return 0
    }
  },

  buildInputMessagesToSend (values) {
    const msg1 = { payload: ((values & di1) === di1), topic: 'DigitalInput1' }
    const msg2 = { payload: ((values & di2) === di2), topic: 'DigitalInput2' }
    const msg3 = { payload: ((values & di3) === di3), topic: 'DigitalInput3' }
    const msg4 = { payload: ((values & di4) === di4), topic: 'DigitalInput4' }
    const msg5 = { payload: ((values & di5) === di5), topic: 'DigitalInput5' }
    const msg6 = { payload: ((values & di6) === di6), topic: 'DigitalInput6' }
    const msg7 = { payload: ((values & di7) === di7), topic: 'DigitalInput7' }
    const msg8 = { payload: ((values & di8) === di8), topic: 'DigitalInput8' }

    const msg9 = {
      payload: {
        'Dig-IN-1': ((values & di1) === di1),
        'Dig-IN-2': ((values & di2) === di2),
        'Dig-IN-3': ((values & di3) === di3),
        'Dig-IN-4': ((values & di4) === di4),
        'Dig-IN-5': ((values & di5) === di5),
        'Dig-IN-6': ((values & di6) === di6),
        'Dig-IN-7': ((values & di7) === di7),
        'Dig-IN-8': ((values & di8) === di8)
      },
      topic: 'DigitalInputs'
    }

    const msg10 = {
      payload: [
        ((values & di1) === di1),
        ((values & di2) === di2),
        ((values & di3) === di3),
        ((values & di4) === di4),
        ((values & di5) === di5),
        ((values & di6) === di6),
        ((values & di7) === di7),
        ((values & di8) === di8)
      ],
      topic: 'DigitalInputValues'
    }

    return [msg1, msg2, msg3, msg4, msg5, msg6, msg7, msg8, msg9, msg10]
  },

  readDigitalInputs (node, ioToRead, ioName) {
    const coreDigitalInternal = this

    fs.readFile(ioToRead, function (err, data) {
      if (err) {
        node.error(err, 'Error while reading ' + ioName)
        node.status({ fill: 'red', shape: 'ring', text: 'Failed' })

        return console.log(err)
      } else {
        const values = Number(data.toString().split(':'))
        const messagesToSend = coreDigitalInternal.buildInputMessagesToSend(values)
        node.status({ fill: 'green', shape: 'ring', text: 'OK' })

        return node.send(messagesToSend)
      }
    })
  },

  buildOutputMessagesToSend (values) {
    const msg1 = { payload: ((values & do1) === do1), topic: 'DigitalOutput1' }
    const msg2 = { payload: ((values & do2) === do2), topic: 'DigitalOutput2' }
    const msg3 = { payload: ((values & do3) === do3), topic: 'DigitalOutput3' }
    const msg4 = { payload: ((values & do4) === do4), topic: 'DigitalOutput4' }

    const msg5 = {
      payload: {
        'Dig-OUT-1': ((values & do1) === do1),
        'Dig-OUT-2': ((values & do2) === do2),
        'Dig-OUT-3': ((values & do3) === do3),
        'Dig-OUT-4': ((values & do4) === do4)
      },
      topic: 'DigitalOutputs'
    }

    const msg6 = {
      payload: [
        ((values & do1) === do1),
        ((values & do2) === do2),
        ((values & do3) === do3),
        ((values & do4) === do4)
      ],
      topic: 'DigitalOutputValues'
    }

    return [msg1, msg2, msg3, msg4, msg5, msg6]
  },

  readDigitalOutputs (node, ioToRead, ioName) {
    const coreDigitalInternal = this

    fs.readFile(ioToRead, function (err, data) {
      if (err) {
        node.error(err, 'Error while reading ' + ioName)
        node.status({ fill: 'red', shape: 'ring', text: 'Failed' })

        return console.log(err)
      } else {
        const values = Number(data.toString().split(':'))
        const messagesToSend = coreDigitalInternal.buildOutputMessagesToSend(values)
        node.status({ fill: 'green', shape: 'ring', text: 'OK' })

        return node.send(messagesToSend)
      }
    })
  },

  getDigitalValueFromInput (msgValue, ioBufferData, digitalValue) {
    // TODO: check here if all is correct after refactor, please
    const value = Number(ioBufferData)

    if (msgValue === true && ((value & digitalValue) !== digitalValue)) {
      return (value + digitalValue) // switch on
    } else if (msgValue === false && ((value & digitalValue) === digitalValue)) {
      return (value - digitalValue) // switch off
    }

    return value // value still the same
  },

  writeDigitalOutput (node, msg, ioWriteStructure) {
    const coreDigitalInternal = this

    if (coreDigitalInternal.lockReadWrite === false) {
      coreDigitalInternal.lockReadWrite = true

      // Read the state of the Output from file
      fs.readFile(ioWriteStructure.ioPath, function (err, ioBufferData) {
        if (err) {
          node.error(err, 'Error while reading ' + ioWriteStructure.ioName)
          node.status({ fill: 'red', shape: 'ring', text: 'Failed' })

          return console.log(err)
        } else {
          // Write the Digital Output (value) if needed
          const value = coreDigitalInternal.getDigitalValueFromInput(msg.payload, ioBufferData, ioWriteStructure.ioValue)

          // Write the Digital Output to file
          fs.writeFile(ioWriteStructure.ioPath, String(value), function (err) {
            if (err) {
              node.error(err, 'Error while writing ' + ioWriteStructure.ioName)
              node.status({ fill: 'red', shape: 'ring', text: 'Failed' })

              return console.log(err)
            } else {
              coreDigitalInternal.lockReadWrite = false
              node.status({ fill: 'green', shape: 'ring', text: 'OK' })

              const msg = {
                payload: (value & ioWriteStructure.ioValue) > 0,
                topic: ioWriteStructure.ioName
              }
              return node.send(msg)
            }
          })
        }
      })
    } else {
      node.warn(ioWriteStructure.ioPath + ' on ' + ioWriteStructure.ioName + ' read-write lock on operation')
      node.status({ fill: 'yellow', shape: 'ring', text: 'Blocked' })
    }
  }
}
