'use strict'
const User = require('./db/models/user')
const Pod = require('./db/models/pod')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

const adventureNotificationFunction = async function(coordinatorId, podId) {
  let coordinator = await User.findById(coordinatorId)

  const users = await User.findAll({
    where: {
      id: {
        [Op.ne]: coordinatorId
      }
    },
    include: [
      {
        model: Pod,
        attributes: ['id'],
        where: {
          id: podId
        }
      }
    ]
  });
  users.forEach(user => {
    user.sendNotifications(coordinator.fullName)
  })
}

module.exports = adventureNotificationFunction
