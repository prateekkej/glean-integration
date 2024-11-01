
const { PATHS } = require('../constants/index')
let config = undefined
const axios = require('axios')

function setConfig(conf) {
    config = conf
}


async function addOrUpdateDataSource(dataSource) {
    const request = dataSource
    const axiosRequest = {
        method: 'POST',
        baseUrl: config.host,
        url: PATHS.ADD_OR_UPDATE_DATA_SOURCES,
        headers: {
            "Authorization": `Bearer ${config.bearerToken}`,
            "content-type": 'application/json'
        },
        data: JSON.stringify(request)
    }
    try {
        const response = await axios(axiosRequest)
        return response.data
    } catch (exc) {
        console.error(exc)
    }
}

async function getDataSourceConfig() {
    const request = { datasource: config.dataSourceId }
    const axiosRequest = {
        method: 'POST',
        url: `${config.host}/api/index/v1/getdatasourceconfig`,
        headers: {
            "Authorization": `Bearer ${config.bearerToken}`,
            "content-type": 'application/json'
        },
        data: JSON.stringify(request)
    }
    try {
        const response = await axios(axiosRequest)
        return { statusCode: response.status, data: response.data }
    } catch (exc) {
        return { statusCode: exc.status, data: exc.data }
    }
}


module.exports = { getDataSourceConfig, addOrUpdateDataSource, setConfig }