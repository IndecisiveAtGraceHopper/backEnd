const express = require('express')
const router = express.Router()
const axios = require('axios')

module.exports = router

router.post('/geocode', async (req, res, next) => {
    try {
        const location = req.body.address.split(' ').join('+')
        const {data} = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`)
        const latitude = data.results[0].geometry.location.lat
        const longitude = data.results[0].geometry.location.lng
        res.status(200).send({latitude, longitude})        
    } catch (err) {
        next(err)
    }
})

router.post('/address', async (req, res, next) => {
    try {
        const coords = req.body.coords
        const lat = coords[1]
        const lng = coords[0]
        const addressObj = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`)
        const address = addressObj.data.results[0].formatted_address
        res.status(200).send({address})
    } catch (err) {
        next(err)
    }
})