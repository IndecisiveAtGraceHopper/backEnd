
const passport = require('passport')
const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const {User} = require('../db/models')
module.exports = router

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.log('Google client ID / secret not found. Skipping Google OAuth.')
} else {
  const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
    scope: ['openid', 'email', 'https://www.googleapis.com/auth/calendar']

  }

  const strategy = new GoogleStrategy(
    googleConfig,
    (token, refreshToken, profile, done) => {
      const googleId = profile.id
      const name = profile.displayName
      const email = profile.emails[0].value
      const accessToken = token

      User.findOrCreate({
        where: {googleId},
        defaults: {name, email, accessToken}
      })
        .then(([user]) => done(null, user))
        .catch(done)
    }
  )

  passport.use(strategy)

  router.get('/', passport.authenticate('google', {session: false}))

  router.get(
    '/callback',
    passport.authenticate('google', {
      failureRedirect: 'https://indecisive-gracehopper.herokuapp.com/login'
    }), function(req, res){
      req.session.access_token = req.user.accessToken
      res.redirect('https://indecisive-gracehopper.herokuapp.com/userhome')

    }
  )
}
