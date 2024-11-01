const IndexingApi = require('./indexing')
const DataSourcesApi = require('./data-sources')
const SearchApi = require('./searching')
const UserApi = require('./user')
const fs = require('fs')


class GleanApis {


    constructor(host, bearerToken) {
        this.host = host
        this.bearerToken = bearerToken
        this.client = {}
        globalThis.log("Initialising Glean APIs with credentials", { host, bearerToken })
        this.initAllApis()
    }

    initApi(fileName) {
        const module = require(__dirname + '/' + fileName)
        globalThis.log(`Initialising ${fileName} APIs`)
        module.setConfig({ host: this.host, bearerToken: this.bearerToken })
        for (const api in module) {
            if (api === 'setConfig') { continue }
            this.client[api] = module[api]
        }
        globalThis.log(`Initialised ${fileName} APIs`)

    }
    initAllApis() {
        let modules = fs.readdirSync(__dirname)
        modules = modules.filter(module => { return module !== 'index.js' })
        modules.forEach(module => this.initApi(module))
        globalThis.log("Initialised Glean APIs with credentials", { host:this.host, bearerToken:this.bearerToken })



        // globalThis.log("Initialising DataSources APIs")
        // DataSourcesApi.setConfig({ host: this.host, bearerToken: this.bearerToken })
        // for (const api in DataSourcesApi) {
        //     if (api === 'setConfig') { continue }
        //     this.client[api] = DataSourcesApi[api]
        // }
        // globalThis.log("Initialised DataSources APIs")


        // globalThis.log("Initialising Search APIs")
        // SearchApi.setConfig({ host: this.host, bearerToken: this.bearerToken })
        // for (const api in SearchApi) {
        //     if (api === 'setConfig') { continue }
        //     this.client[api] = SearchApi[api]
        // }
        // globalThis.log("Initialised Search APIs")

        // globalThis.log("Initialising User APIs")
        // UserApi.setConfig({ host: this.host, bearerToken: this.bearerToken })
        // for (const api in UserApi) {
        //     if (api === 'setConfig') { continue }
        //     this.client[api] = UserApi[api]
        // }
        // globalThis.log("Initialised User APIs")


    }

    getClient() {
        return this.client
    }

}

module.exports = GleanApis 