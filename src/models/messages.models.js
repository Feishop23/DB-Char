const {DataTypes} = require('sequelize')
const db = require('../utils/database')
const Users = require('./users.models')
const Conversation = require('./conversations.models')

const Message = db.define('message',{
    id:{
        type:DataTypes.UUID,
        allowNull:false,
        primaryKey:true
    },
    senderId:{
        type:DataTypes.UUID,
        allowNull:false,
        field: 'sender_id',
        references:{
            key: 'id',
            model: Users
        }
    },
    conversationId:{
        type:DataTypes.UUID,
        allowNull:false,
        field: 'conversation_id',
        references:{
            key: 'id',
            model: Conversation
        }
    },
    message:{
        type:DataTypes.STRING(255),
        allowNull:false
    }
})

module.exports = Message