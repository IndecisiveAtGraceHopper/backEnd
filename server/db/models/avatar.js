const Sequelize = require('sequelize')
const db = require('../db')

const defaultImage = "http://localhost:3000/default_image.png"

const Avatar = db.define('avatar', {
  image: {
    type: Sequelize.STRING,
    defaultValue: defaultImage
  }
})

module.exports = Avatar
