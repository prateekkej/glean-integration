const Document = require('../models').Document
const fs = require('fs')


async function loadDocuments(filePath, opts) {
    globalThis.log(`Loading Documents from CSV File`, { filePath, opts })
    const data = fs.readFileSync(filePath).toString().split('\n')
    const headers = data[0].split(',')
    const docsData = data.slice(1).map(x => { const doc = x.split(','); return doc.length === headers.length ? doc : undefined })

    globalThis.log(`Documents loaded from CSV File. Total Documents - ${docsData.length}`)
    const documents = await Document.fromCSV(headers, docsData, opts)
    return documents
}

module.exports = { loadDocuments }