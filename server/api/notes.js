
const express = require('express')
const router = express.Router()
const Note = require('../db/models/note')
const {userAuth} = require('../api/auth')

module.exports = router


router.post('/', async (req, res, next) => {
    try {
        const newNote = await Note.create(req.body)
        res.json(newNote)
    } catch (err) {
        next(err)
    }
})

router.use('/:id', async(req, res, next) => {
    try {
        const note = await Note.findById(req.params.id)
        if (note.userId === req.user.id){
            req.note = note
            next()
        }
        else{
            res.sendStatus(401)
        }
    }
    catch(err){
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const updatedNote = await req.note.update(req.body)
        res.json(updatedNote)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        req.note.destroy()
        res.sendStatus(204)
    } catch (err) {
        next(err)
    }
})

