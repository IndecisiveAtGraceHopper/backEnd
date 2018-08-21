var express = require('express')
var router = express.Router()

if (process.env.NODE_ENV !== 'production') require('../../secrets')

const cors = require('cors')
const whiteList = ['http://localhost:3000', 'https://indecisive-gracehopper.herokuapp.com']
const corsOptions = {
  origin: function(origin, callback) {
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      console.log(origin)
      callback(new Error('Not allowed by CORS'))
    }
  }
}
router.use(cors(corsOptions))
router.options('/', cors(corsOptions))

router.use('/users', require('./users'))

router.use('/activities', require('./activities'))

router.use('/adventures', require('./adventures'))

router.use('/notes', require('./notes'))

router.use('/pods', require('./pods'))

router.use('/polls', require('./polls'))

router.use('/date', require('./date'))


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

module.exports = router
