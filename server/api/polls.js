
const express = require('express')
const router = express.Router()
const Poll = require('../db/models/poll')
const {userAuth} = require('../api/auth')


module.exports = router

router.use('/', (req, res, next) => {
    try {
        res.set({
            'Access-Control-Allow-Origin': 'http://localhost:3000'
        })
        next()
    } catch (err) {
        next(err)
    }
})

router.get('/', async (req, res, next) => {
    try {
        const polls = await Poll.findAll()
        res.json(polls)
    } catch (err) {
        next(err)
    }
})

router.get('/', async (req, res, next) => {
    try {
        const poll = await Poll.findById(req.params.pollId)
        res.json(poll)
    } catch (err) {
        next(err)
    }
})

router.post('/poll', async (req, res, next) => {
    try {
        const newPoll = await Poll.create(req.body)
        res.status(201).send(newPoll)
    } catch (err) {
        next(err)
    }
})
