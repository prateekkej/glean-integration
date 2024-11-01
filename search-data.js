const config = require('./config')
const { log, init: initLogger } = require('./lib/logger/index')
initLogger({ loggingPath: config.loggingPath, fileName: 'search-logs', toConsole: true })
globalThis.log = log

const GleanApis = require('./lib/api')
const api = new GleanApis(config.host, config.searchToken)
const gleanClient = api.getClient()
globalThis.gleanClient = gleanClient




const Express = require('express')
const app = Express()




app.use(Express.static('./web'))
app.use(require('./lib/routes'))

app.listen(8080, () => { console.log('Service is up') })





