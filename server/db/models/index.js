const User = require('./user')
const Activity = require('./activity')
const Adventure = require('./adventure')
const Note = require('./note')
const Poll = require('./poll')
const Pod = require('./pod')
const UserPod = require('./userPod')
const Avatar = require('./avatar')

User.belongsTo(Avatar)
Avatar.hasMany(User)

Adventure.belongsTo(User, { foreignKey: 'coordinator' })
User.hasMany(Adventure, { foreignKey: 'coordinator' })

Pod.hasMany(Adventure)
Adventure.belongsTo(Pod)

User.belongsToMany(Pod, { through: 'user_pods' })
Pod.belongsToMany(User, { through: 'user_pods' })

UserPod.belongsTo(User)
User.hasMany(UserPod)


User.hasMany(Poll)
Poll.belongsTo(User)

Poll.belongsTo(Adventure)
Adventure.hasMany(Poll)

Adventure.hasMany(Activity)
Activity.belongsTo(Adventure)

Adventure.hasOne(Note)
Note.belongsTo(Adventure)

Note.belongsTo(User)
User.hasMany(Note)

module.exports = {
  User,
  Activity,
  Adventure,
  Note,
  Poll,
  Pod,
  UserPod,
  Avatar
}
