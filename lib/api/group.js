
const { PATHS } = require('../constants/index')
let config = undefined
const axios = require('axios')

function setConfig(conf) {
    config = conf
}


async function indexGroups(dataSource, groups) {
    globalThis.log(`Indexing groups in bulk for the data source -  ${dataSource}`, { groups, dataSource })
    const responses = {}
    for (const group of groups) {
        globalThis.log(`Indexing group ${group.name} for the data source -  ${dataSource}`, { group, dataSource })
        const response = await indexGroup(dataSource, group)
        responses[groups.name] = response
    }
    return responses

}

async function indexGroup(dataSource, group) {
    const request = { datasource: dataSource, group: group.getJSON() };
    const axiosRequest = {
        method: 'POST',
        baseURL: config.host,
        url: PATHS.INDEX_GROUP,
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
        const response = exc.response
        return { statusCode: response.status, data: response.data }
    }

}

module.exports = { indexGroup, indexGroups, setConfig }