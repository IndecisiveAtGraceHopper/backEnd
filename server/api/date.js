const express = require('express')
const router = express.Router()
const gcal = require('google-calendar')


module.exports = router

router.all('/', function(req, res){
if (!req.session.access_token) return res.redirect('/auth')

var accessToken = req.session.access_token
var calendarId = 'primary'

gcal(accessToken).events.list(calendarId, function(err, data) {
  if (err) return res.send(500, err)
  return res.send(data);
});
});

router.all('/add', function(req, res){

  if (!req.session.access_token) return res.redirect('/auth')

  var accessToken  = req.session.access_token
  var calendarId = 'primary'
  var event = "Go to the Zoo on September 3rd 10am-2pm"
   || 'Hello World'

  gcal(accessToken).events.quickAdd(calendarId, event, function(err, data) {
    if (err) return res.send(500, err)
    return res.send(data)
  });
});
