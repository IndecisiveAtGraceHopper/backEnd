var express = require('express')
var router = express.Router()

if (process.env.NODE_ENV !== 'production') require('../../secrets')

const whiteList = ['http://localhost:3000', 'http://localhost:3001', 'https://indecisive-gracehopper.herokuapp.com', 'https://obscure-lowlands-38066.herokuapp.com']
router.use('/', (res, req, next) => {
  try {
    const origin = req.header.origin
    if (whiteList.indexOf(origin) !== -1) {
      res.header('Access-Control-Allow-Origin', origin)
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
      res.header('Access-Control-Allow-Headers')
    } else {
      next(new Error('Not allowed by CORS'))
    }
  } catch (err) {
    next(err)
  }
})

router.use('/users', require('./users'))

router.use('/activities', require('./activities'))

router.use('/adventures', require('./adventures'))

router.use('/notes', require('./notes'))

router.use('/pods', require('./pods'))

router.use('/polls', require('./polls'))

router.use('/date', require('./date'))

router.use('/geoLoc', require('./geoLoc'))


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

module.exports = router
