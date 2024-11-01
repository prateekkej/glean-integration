let gleanClient = globalThis.gleanClient;
const Query = require('../models/query')


async function searchDocuments(req, res, next) {
    const requestQuery = req.query.query
    if (!requestQuery) (next(new Error("Query not passed to search")))
    const query = parseSearchQuery(requestQuery)

    globalThis.log(`Searching Documents from glean`, query.getJSON())
    const response = await gleanClient.searchDocuments(query)
    if (response.statusCode < 299) {
        globalThis.log(`Searched the platform for the query. Below are the results`, simplifyResults(response.data))
        res.send({ result: simplifyResults(response.data) })
    } else {
        globalThis.log(`Could not search the platform for the query. Below is the response`, response.data)
    }
    next()
}

function simplifyResults({ results }) {
    const documents = []
    if (!results) return documents
    for (const result of results) {
        documents.push({
            title: result.title,
            url: result.url,
            updatedAt: result?.document?.metadata?.updateTime,
            snippets: result.snippets.map(snippet => { return { snippet: snippet.text, highlightedRanges: snippet?.ranges } })
        })
    }
    return documents;

}


function parseSearchQuery(searchQuery) {
    searchQuery = searchQuery || ''
    const splitQuery = searchQuery.split(' ')
    const words = []
    const filters = [];
    splitQuery.forEach(word => { if (word.includes(':')) { filters.push(word) } else { words.push(word) } })
    const query = new Query(words.join(" "))
    query.setPageSize(50)
    const requestOptions = new Query.RequestOptions(0)
    filters.forEach(filter => {
        const splitFilter = filter.split(':')
        const facetFilterField = splitFilter[0]
        const fieldValues = splitFilter[1].split(',')
        requestOptions.addFacetFilter(facetFilterField, fieldValues.map(value => { return new Query.FilterValue(value, Query.RELATION_TYPES.EQUALS) }))
    })
    query.setRequstOptions(requestOptions)
    return query
}






module.exports = { searchDocuments }