const fs = require('fs')
const config = {}

function init({ loggingPath, fileName, delimiter, toConsole }) {
    delimiter = delimiter || '\t'
    config.loggingPath = loggingPath
    config.fileName = fileName || 'logs.txt'
    config.toConsole = toConsole
}

function log(message, data) {
    const time = new Date().toUTCString()
    const messageRecord = [time, config.delimiter, message].join('\t')
    let dataRecord = undefined
    if (data) {
        dataRecord = [time, config.delimiter, JSON.stringify(data)].join('\t')
    }
    const log = messageRecord + '\n' + (dataRecord ? dataRecord + "\n" : undefined || '')
    if (config.toConsole) { console.log(log) }
    fs.appendFileSync(config.loggingPath + '/' + config.fileName, log)
}


module.exports = { log, init }