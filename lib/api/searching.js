
const { PATHS } = require('../constants/index')
let config = undefined
const axios = require('axios')

function setConfig(conf) {
    config = conf
}


async function searchDocuments(query) {
    const request = query.getJSON()
    const axiosRequest = {
        method: 'POST',
        baseURL: config.host,
        url: PATHS.SEARCH,
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


module.exports = { searchDocuments, setConfig }