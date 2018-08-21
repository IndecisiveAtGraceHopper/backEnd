const router = require('express').Router()
const {User, Order, Review, LineItem, Product} = require('../db/models')
module.exports = router
const {userAuth} = require('../api/auth')

const whiteList = ['http://localhost:3000', 'http://localhost:3001', 'https://indecisive-gracehopper.herokuapp.com', 'https://obscure-lowlands-38066.herokuapp.com']
router.use('/', (req, res, next) => {
  try {
    const origin = req.headers.origin
    if (whiteList.indexOf(origin) !== -1) {
      res.header('Access-Control-Allow-Origin', origin)
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
      res.header('Access-Control-Allow-Headers')
      next()
    } else {
      next(new Error('Not allowed by CORS'))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
     where: {
       email: req.body.email
      }
    })

    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.put('/profile/:id', async(req, res, next) => {
  try {
    const profile = await User.findById(req.params.id)
    const updatedProfile = await profile.update({firstName: req.body.firstName, lastName: req.body.lastName, phone: req.body.phone, address: req.body.address, email: req.body.email, image: req.body.image})
    res.status(202).send(updatedProfile)
  }
  catch (error){
    next(error)
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', async (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
