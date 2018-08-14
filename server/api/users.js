var express = require('express');
var router = express.Router();
var {Poll, User} = require('../db/models')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([
    {id: 1, username: 'somebody'},
    {id: 2, username: 'somebody_else'}
  ])
});

router.get('/poll', function(req, res, next) {
  res.send('hello')
})

router.post('/poll', async (req, res, next) => {
  const newPoll = await Poll.create(req.body)
  res.status(201).send(newPoll)
})



module.exports = router;



