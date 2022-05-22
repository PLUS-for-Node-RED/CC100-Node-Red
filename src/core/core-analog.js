
const fs = require('fs')

module.exports = {
  // core analog functions to get them tested

  getNumberFromAnalogData(data) {
    const numberData = Number(data)
    const calculatedNumber = Math.round(numberData / 560 ) / 10.0
    return Number(calculatedNumber.toFixed(2))
  },

  readAnalogInput (node, ioToRead, ioName) {
    fs.readFile(ioToRead, function (err, data) {

      if (err) {
        node.error(err, 'Error while reading ' + ioName)
        node.status({ fill: 'red', shape: 'ring', text: 'Failed' })

        return console.log(err)
      } else {
        msg.payload = this.getNumberFromAnalogData(data)
        node.status({ fill: 'green', shape: 'ring', text: 'OK' })

        return node.send(msg)
      }
    })
  }
}
