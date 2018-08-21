const express = require('express')
const router = express.Router()
const Activity = require('../db/models/activity')

module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const activities = await Activity.findAll({attributes: ['name', 'date', 'address', 'rating', 'selected', 'upVotes', 'downVotes']})
        res.json(activities)
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const properties = {
            name: req.body.name,
            date: req.body.date
        }
        const newActivity = await Activity.create(properties)
        res.json(newActivity)
    } catch (err) {
        next(err)
    }
})

router.use('/:id', async(req, res, next) => {
    try {
        const activity = await Activity.findById(req.params.id, {
            attributes: ['name', 'date', 'address', 'rating', 'selected', 'upVotes', 'downVotes']
        })
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

// router.post('/', async (req, res, next) => {
//     try {
//         const newActivity = await Activity.create(req.body)
//         res.json(newActivity)
//     } catch (err) {
//         next(err)
//     }
// })

// router.put('/:id', async (req, res, next) => {
//     try {
//         const updatedActivity = await req.activity.update(req.body)
//         res.json(updatedActivity)
//     } catch (err) {
//         next(err)
//     }
// })
router.get('/:id', async (req, res, next) => {
    try {
        res.json(req.activity)
    } catch (err) {
        next(err)
    }
})


router.put('/:id', async (req, res, next) => {
    try {
        const updates = {
            name: req.body.name ? req.body.name : null,
            date: req.body.date ? req.body.date : null,
            address: req.body.address ? req.body.address : null,
            rating: req.body.rating ? req.body.rating : null,
            selected: req.body.selected ? req.body.selected : null,
            upVotes: req.body.upVotes ? req.body.upVotes : null,
            downVotes: req.body.downVotes ? req.body.downVotes : null
        }
        await req.activity.update(updates)
        res.status(201).json(req.activity)
    } catch (err) {
        next(err)
    }
})

// router.delete('/:id', async (req, res, next) => {
//     try {
//         req.activity.destroy()
//         res.sendStatus(204)
//     } catch (err) {
//         next(err)
//     }
// })
