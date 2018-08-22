const path = require('path')
const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./db')
const sessionStore = new SequelizeStore({db})
const PORT = process.env.PORT || 3001
const app = express()

if (process.env.NODE_ENV === 'test') {
  after('close the session store', () => sessionStore.stopExpiringSessions())
}

if (process.env.NODE_ENV !== 'production') require('../secrets')

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findById(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

const createApp = () => {
  app.use(require('body-parser').text())

  app.use(function(req, res, next) {
    try {
      const origin = req.headers.origin
      const whitelist = ['http://localhost:3000', 'http://localhost:3001', 'https://indecisive-ghr.herokuapp.com', 'https://pacific-bayou-90411.herokuapp.com']
      if (whitelist.indexOf(origin) !== -1) {
        res.header('Access-Control-Allow-Credentials', true)
        res.header('Access-Control-Allow-Origin', origin)    
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept')
        if ('OPTIONS' === req.method) {
          res.sendStatus(200)
        } else {
          next()          
        }
      } else {
        next(new Error('Not allowed by CORS'))
      }
    } catch (err) {
      next(err)
    }
  })

  app.use(morgan('dev'))

  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  app.use(compression())

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'default secret',
      store: sessionStore,
      resave: false,
      saveUninitialized: false
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())

  app.use('/auth', require('./auth'))
  app.use('/api', require('./api'))

  app.use(express.static(path.join(__dirname, '..', '/public')))

  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })
}

// sends index.html
// app.use('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'client/public'))
// })

// error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

const startListening = () => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
  })
  // const io = socketio(server)
  // require('../client/socket')(io)
}

const syncDb = () => db.sync()

async function bootApp() {
  await sessionStore.sync()
  await syncDb()
  await createApp()
  await startListening()
}

if (require.main === module) {
  bootApp()
} else {
  createApp()
}

module.exports = app
