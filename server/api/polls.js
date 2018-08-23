
const express = require('express')
const router = express.Router()
const Poll = require('../db/models/poll')
const {userAuth} = require('../api/auth')


module.exports = router


router.post('/poll', async (req, res, next) => {
    try {
        const newPoll = await Poll.create(req.body)
        res.status(201).send(newPoll)
    } catch (err) {
        next(err)
    }
})
