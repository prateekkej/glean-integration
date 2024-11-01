

class Query {

    constructor(query) {
        this.query = query
    }
    setPageSize(size) {
        this.pageSize = size
    }
    setRequstOptions(requestOptions) {
        this.requestOptions = requestOptions
    }

    getJSON() {
        return {
            query: this.query,
            pageSize: this.pageSize,
            requestOptions: this.requestOptions.getJSON()
        };
    }
    setProperty(key, value) {
        this[key] = value
    }

}

Query.RequestOptions = class {
    constructor(facetBucketSize) {
        this.facetBucketSize = facetBucketSize ;
        this.filters = []
    }

    addFacetFilter(fieldName, values) {
        this.filters.push({ fieldName, values: values.map(value => value.getJSON()) })
    }

    getJSON() {
        return {
            facetBucketSize: this.facetBucketSize,
            facetFilters: this.filters
        }
    }
}


Query.RELATION_TYPES = { EQUALS: 'EQUALS', LT: 'LT', GT: 'GT' }

Query.FilterValue = class {
    constructor(value, relationType) {
        this.value = value
        this.relationType = relationType
    }
    setValue(value) { this.value = value }
    setRelationType(relationType) {
        this.relationType = relationType
    }

    getJSON() {
        return { value: this.value, relationType: this.relationType }
    }
}



module.exports = Query 