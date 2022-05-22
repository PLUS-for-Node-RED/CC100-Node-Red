module.exports = function (RED) {
  const coreDigital = require('./core/core-digital')
  const DigOutPID = '/sys/kernel/dout_drv/DOUT_DATA'

  const do1 = 1
  const do2 = 2
  const do3 = 4
  const do4 = 8

  const TRUE = true
  const FALSE = false
  global.monitor = false

  // Set Digital Output 1
  function setDO1 (config) {
    RED.nodes.createNode(this, config)
    const node = this
    let value
    const fs = require('fs')

    node.on('input', function (msg) {
      if (global.monitor === false) {
        global.monitor = true
        // Read the state of the Output's from file
        fs.readFile(DigOutPID, function (err, data) {
          if (err) {
            node.error(err, 'Error while reading DigInPID')
            node.status({ fill: 'red', shape: 'ring', text: 'Failed' })
            return console.log(err)
          } else {
            if (RED.settings.verbose) {
              console.log('Read DO 1 on CC100 was successful.')
              console.log('Raw Data: ' + data)
            }
            value = Number(data)
            // Write the Digital Output 1 (value) if needed
            if (msg.payload === true & ((value & do1) !== do1)) {
              value = (value + do1)
              msg.payload = value
            } else if (msg.payload === false & ((value & do1) === do1)) {
              value = (value - do1)
              msg.payload = value
            } else {
              msg.payload = value
            }
          }
          // Write the Digital Output 1 to file
          const fs = require('fs')
          fs.writeFile(DigOutPID, String(msg.payload), function (err) {
            if (err) {
              node.status({ fill: 'red', shape: 'ring', text: 'Failed' })
              return console.log(err)
            } else {
              if (RED.settings.verbose) {
                console.log('Write DO 1 on CC100 was successful.')
              }
              node.status({ fill: 'green', shape: 'ring', text: 'OK' })
            }
          })
          if (msg.payload & (value & do1)) {
            msg.payload = TRUE
          } else {
            msg.payload = FALSE
          }
          global.monitor = false
          node.send(msg)
        })
      } else {
        if (RED.settings.verbose) {
          console.log('Write DO 1 on CC100 was not possible.')
        }
        node.status({ fill: 'yellow', shape: 'ring', text: 'Blocked' })
      }
    })
  }

  RED.nodes.registerType('Set-DO1', setDO1)

  // Set Digital Output 2
  function setDO2 (config) {
    RED.nodes.createNode(this, config)
    const node = this
    let value
    const fs = require('fs')
    node.on('input', function (msg) {
      if (global.monitor === false) {
        global.monitor = true
        // Read the state of the Output's from file
        fs.readFile(DigOutPID, function (err, data) {
          if (err) {
            node.status({ fill: 'red', shape: 'ring', text: 'Failed' })
            return console.log(err)
          } else {
            if (RED.settings.verbose) {
              console.log('Read DO 2 on CC100 was successful.')
              console.log('Raw Data: ' + data)
            }
            value = Number(data)
            // Write the Digital Output 2 (value) if needed
            if (msg.payload === true & ((value & do2) !== do2)) {
              value = (value + do2)
              msg.payload = value
            } else if (msg.payload === false & ((value & do2) === do2)) {
              value = (value - do2)
              msg.payload = value
            } else {
              msg.payload = value
            }
          }
          // Write the Digital Output 2 to file
          const fs = require('fs')
          fs.writeFile(DigOutPID, String(msg.payload), function (err) {
            if (err) {
              node.status({ fill: 'red', shape: 'ring', text: 'Failed' })
              return console.log(err)
            } else {
              if (RED.settings.verbose) {
                console.log('Write DO 2 on CC100 was successful.')
              }
              node.status({ fill: 'green', shape: 'ring', text: 'OK' })
            }
          })
          if (msg.payload & (value & do2)) {
            msg.payload = TRUE
          } else {
            msg.payload = FALSE
          }
          global.monitor = false
          node.send(msg)
        })
      } else {
        if (RED.settings.verbose) {
          console.log('Write DO 2 on CC100 was not possible.')
        }
        node.status({ fill: 'yellow', shape: 'ring', text: 'Blocked' })
      }
    })
  }

  RED.nodes.registerType('Set-DO2', setDO2)

  // Set Digital Output 3
  function setDO3 (config) {
    RED.nodes.createNode(this, config)
    const node = this
    let value
    const fs = require('fs')
    node.on('input', function (msg) {
      if (global.monitor === false) {
        global.monitor = true
        // Read the state of the Output's from file
        fs.readFile(DigOutPID, function (err, data) {
          if (err) {
            node.status({ fill: 'red', shape: 'ring', text: 'Failed' })
            return console.log(err)
          } else {
            if (RED.settings.verbose) {
              console.log('Read DO 3 on CC100 was successful.')
              console.log('Raw Data: ' + data)
            }
            value = Number(data)
            // Write the Digital Output 3 (value) if needed
            if (msg.payload === true & ((value & do3) !== do3)) {
              value = (value + do3)
              msg.payload = value
            } else if (msg.payload === false & ((value & do3) === do3)) {
              value = (value - do3)
              msg.payload = value
            } else {
              msg.payload = value
            }
          }
          // Write the Digital Output 3 to file
          const fs = require('fs')
          fs.writeFile(DigOutPID, String(msg.payload), function (err) {
            if (err) {
              node.status({ fill: 'red', shape: 'ring', text: 'Failed' })
              return console.log(err)
            } else {
              if (RED.settings.verbose) {
                console.log('Write DO 3 on CC100 was successful.')
              }
              node.status({ fill: 'green', shape: 'ring', text: 'OK' })
            }
          })
          if (msg.payload & (value & do3)) {
            msg.payload = TRUE
          } else {
            msg.payload = FALSE
          }
          global.monitor = false
          node.send(msg)
        })
      } else {
        if (RED.settings.verbose) {
          console.log('Write DO 3 on CC100 was not possible.')
        }
        node.status({ fill: 'yellow', shape: 'ring', text: 'Blocked' })
      }
    })
  }

  RED.nodes.registerType('Set-DO3', setDO3)

  // Set Digital Output 4
  function setDO4 (config) {
    RED.nodes.createNode(this, config)
    const node = this
    let value
    const fs = require('fs')
    node.on('input', function (msg) {
      if (global.monitor === false) {
        global.monitor = true
        // Read the state of the Output's from file
        fs.readFile(DigOutPID, function (err, data) {
          if (err) {
            node.status({ fill: 'red', shape: 'ring', text: 'Failed' })
            return console.log(err)
          } else {
            if (RED.settings.verbose) {
              console.log('Read DO 4 on CC100 was successful.')
              console.log('Raw Data: ' + data)
            }
            value = Number(data)
            // Write the Digital Output 4 (value) if needed
            if (msg.payload === true & ((value & do4) !== do4)) {
              value = (value + do4)
              msg.payload = value
            } else if (msg.payload === false & ((value & do4) === do4)) {
              value = (value - do4)
              msg.payload = value
            } else {
              msg.payload = value
            }
          }
          // Write the Digital Output 4 to file
          const fs = require('fs')
          fs.writeFile(DigOutPID, String(msg.payload), function (err) {
            if (err) {
              node.status({ fill: 'red', shape: 'ring', text: 'Failed' })
              return console.log(err)
            } else {
              if (RED.settings.verbose) {
                console.log('Write DO 4 on CC100 was successful.')
              }
              node.status({ fill: 'green', shape: 'ring', text: 'OK' })
            }
          })
          if (msg.payload & (value & do4)) {
            msg.payload = TRUE
          } else {
            msg.payload = FALSE
          }
          global.monitor = false
          node.send(msg)
        })
      } else {
        if (RED.settings.verbose) {
          console.log('Write DO 4 on CC100 was not possible.')
        }
        node.status({ fill: 'yellow', shape: 'ring', text: 'Blocked' })
      }
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
