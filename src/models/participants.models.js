const {DataTypes} = require('sequelize')
const db = require('../utils/database')
const User = require('./users.models')
const Conversation = require('./conversations.models')

const Participant = db.define('participant',{
    id:{
        type:DataTypes.UUID,
        allowNull:false,
        primaryKey:true
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
    userId:{
        type:DataTypes.UUID,
        allowNull:false,
        field:'user_id',
        references:{
            key:'id',
            model: User
        }
    }
})

module.exports = Participant