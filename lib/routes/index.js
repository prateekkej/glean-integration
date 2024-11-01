const Router = require('express').Router
const router = Router()
const searchController = require('../controllers').search



router.get('/search', searchController.searchDocuments)

module.exports = router


