'use strict'
const User = require('./db/models/user')
const Pod = require('./db/models/pod')


const pollCompleteNotification = async function(podId) {

  const users = await User.findAll({
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
    user.sendPollCompleteNotification()
  })
}

module.exports = pollCompleteNotification
