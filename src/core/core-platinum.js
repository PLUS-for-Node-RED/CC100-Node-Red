const fs = require('fs')

module.exports = {

  // core platinum functions to get them tested

  verboseMode: true,

  getPlatinumScale (dataNumber) {
    // TODO: better name for the parameter?
    let scale = 0

    // TODO: name values what it is: factor, rangeXXDegree or a better naming?
    if (dataNumber >= 600 && dataNumber < 3600) {
      scale = 37
    } else if (dataNumber >= 3600 && dataNumber < 6700) {
      scale = 43
    } else if (dataNumber >= 6700 && dataNumber < 9750) {
      scale = 45
    } else if (dataNumber >= 9750 && dataNumber < 12740) {
      scale = 49
    } else if (dataNumber >= 12740 && dataNumber < 15700) {
      scale = 50.6
    } else if (dataNumber >= 15700 && dataNumber < 21000) {
      scale = 52.4
    } else if (dataNumber > 21000) {
      scale = 53.7
    } else {
      scale = 0
    }

    return scale
  },

  calculatePlatinumValue (data) {
    const dataNumber = Number(data)
    const scale = this.getPlatinumScale(dataNumber)
    return Number(dataNumber / scale - 200)
  },

  readPlatinumInput (node, msg, ioPath, ioName) {
    const corePlatinumInternal = this

    fs.readFile(ioPath, function (err, ioBufferData) {
      if (err) {
        node.error(err, 'Error while reading ' + ioName)
        node.status({ fill: 'red', shape: 'ring', text: 'Failed' })

        return console.log(err)
      } else {
        const calculatedValue = corePlatinumInternal.calculatePlatinumValue(ioBufferData)
        // TODO: really reuse of the incoming msg object
        msg.payload = calculatedValue.toFixed(1)

        node.status({ fill: 'green', shape: 'ring', text: 'OK' })
        return node.send(msg)
      }
    })
  }
}
