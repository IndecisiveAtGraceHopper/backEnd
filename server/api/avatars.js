const express = require('express')
const router = express.Router()
const {Avatar} = require('../db/models')


module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const avatars = await Avatar.findAll()
        res.json(avatars)
    } catch (err) {
        next(err)
    }
})
