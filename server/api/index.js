var express = require('express')
var router = express.Router()

if (process.env.NODE_ENV !== 'production') require('../../secrets')

router.use('/users', require('./users'))

router.use('/google', require('./googleMaps'))

router.use('/activities', require('./activities'))

router.use('/adventures', require('./adventures'))

router.use('/notes', require('./notes'))

router.use('/pods', require('./pods'))

router.use('/polls', require('./polls'))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

module.exports = router
