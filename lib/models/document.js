const axios = require('axios')
const { MIME_TYPES, OBJECT_TYPES } = require('../constants')
const { parse } = require('node-html-parser')


class Document {

    constructor() {

    }
    setViewURL(url) {
        this.viewURL = url
    }
    setDataSource(ds) {
        this.datasource = ds
    }

    getJSON() {
        return this;
    }
    setProperty(key, value) {
        this[key] = value
    }
    setPermissions(permissions) {
        this.permissions = permissions
    }

    static async fromCSV(headers, data, opts) {
        const fetchViewUrl = opts?.fetchViewUrl !== undefined ? opts.fetchViewUrl : true
        const documents = []
        for (const doc of data) {
            const document = new Document()
            globalThis.log(`Deserialising document from CSV File.`, { doc })
            for (let index = 0; index < headers.length; index++) {
                const header = headers[index]
                const value = doc[index]
                switch (header) {
                    case 'allowAnonymousAccess':
                        document.setPermissions({ allowAnonymousAccess: value.toLowerCase() === 'true' ? true : false })
                        break;
                    case 'viewURL':
                        if (fetchViewUrl) {
                            const response = await axios(value)
                            const htmlPage = parse(response.data)
                            const textContent = extractTextContent(htmlPage)
                            const title = extractTitle(htmlPage)
                            if (title) {
                                document.setProperty('title', title)
                            }
                            if (textContent) {
                                document.setProperty('summary', { mimeType: MIME_TYPES.TEXT, textContent })
                            }
                        }
                        const url = new URL(value)
                        document.setViewURL(`https://example.com/docs${url.pathname}`)
                        break;
                    case 'tags':
                        document.setProperty('tags', value.split(','))
                        break;
                    default:
                        document[header] = value
                        break;
                }
            }
            document.objectType = OBJECT_TYPES.INTERVIEW_DOC
            document.updatedAt=parseInt(Date.now()/1000)
            documents.push(document)
            globalThis.log(`Deserialised the document from CSV File.`, { doc: document.getJSON() })
        }
        globalThis.log(`Deserialised all the documents from CSV File.`)

        return documents


    }
}

function extractTextContent(page) {
    return page.querySelector('meta[property="og:description"]')?.getAttribute('content') || page.querySelector('meta[property="og:title"]')?.getAttribute('content') || undefined
}

function extractTitle(page) {
    return page.querySelector('meta[property="og:title"]')?.getAttribute('content') || undefined

}

function extractAuthor(page) {
    return page.querySelector('meta[name="author"]')?.getAttribute('content') || undefined

}
module.exports = Document 