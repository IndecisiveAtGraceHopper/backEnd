const express = require('express')
const router = express.Router()
const Pod = require('../db/models/pod')
const Adventure = require('../db/models/adventure')
const User = require('../db/models/user')
const UserPod = require('../db/models/userPod')
const {userAuth} = require('../api/auth')

module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const pods = await Pod.findAll()
        res.json(pods)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const pod = await Pod.findById(req.params.id,
           {
            include: [{
                model: User,
                include: [{
                    model: Adventure
                }]
            }]
        })
        res.json(pod)
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const newPod = await Pod.create(req.body)
        res.json(newPod)
    } catch (err) {
        next(err)
    }
})

router.post('/userPod', async (req, res, next) => {
try {
    const pod = await Pod.findById(+req.body.podId)
        const user = await User.findById(+req.body.userId)
        pod.addUser(+req.body.userId)
        res.json({pod, user})
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const pod = await Pod.findById(req.params.id)
        const updatedPod = await pod.update(req.body)
        res.json(updatedPod)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const pod = await Pod.findById(req.params.id)
        pod.destroy()
        res.sendStatus(204)
    } catch (err) {
        next(err)
    }
})
