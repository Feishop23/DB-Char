const {DataTypes} = require('sequelize')
const db = require('../utils/database')
const User = require('./users.models')

const Conversation = db.define('conversation',{
    id:{
        type:DataTypes.UUID,
        allowNull:false,
        primaryKey:true
    },
    title:{
        type:DataTypes.STRING(30),
        allowNull:false
    },
    imageUrl:{
        type:DataTypes.STRING,
        field:'image_url',
        validate:{
            isUrl:true
        }
    },
    createdBy:{
        type:DataTypes.UUID,
        allowNull:false,
        field: 'created_by',
        references:{
            key: 'id',
            model: User
        }
    }
})

module.exports = Conversation