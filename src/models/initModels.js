const Conversation = require('./conversations.models')
const Message = require('./messages.models')
const Participant = require('./participants.models')
const User = require('./users.models')


const initModels = () => {

User.hasMany(Message)
Message.belongsTo(User)

User.hasMany(Participant)
Participant.belongsTo(User)

User.hasMany(Conversation)
Conversation.belongsTo(User)

Conversation.hasMany(Message)
Message.belongsTo(Conversation)

Conversation.hasMany(Participant)
Participant.belongsTo(Conversation)


}

module.exports = initModels