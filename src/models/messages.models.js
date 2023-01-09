const {DataTypes} = require('sequelize')
const db = require('../utils/database')

const Message = db.define('message',{
    id:{
        type:DataTypes.UUID,
        allowNull:false,
        primaryKey:true
    },
    message:{
        type:DataTypes.STRING(255),
        allowNull:false
    }
})

module.exports = Message