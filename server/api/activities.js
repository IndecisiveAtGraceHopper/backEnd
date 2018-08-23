const express = require('express')
const router = express.Router()
const Activity = require('../db/models/activity')

module.exports = router


router.use('/:id', async(req, res, next) => {
    try {
        const activity = await Activity.findById(req.params.id)
        if (activity) {
            req.activity = activity
            next()
        }
        else {
            const err = new Error ('No Activity Found')
            err.status = 404
            next(err)
        }
    }
    catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        res.json(req.activity)
    } catch (err) {
        next(err)
    }
})

//create new route, when activity is updated...send to google calendar
//get all users associated with a pod and with the same adventureId
//need activity name, date, address
router.put('/:id', async (req, res, next) => {
    try {
        await req.activity.update(req.body)
        res.status(201).json(req.activity)
    } catch (err) {
        next(err)
    }
})

