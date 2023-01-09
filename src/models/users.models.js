const {DataTypes} = require('sequelize')
const db = require('../utils/database')

const User = db.define('user',{
id:{
    type:DataTypes.UUID,
    primaryKey:true,
    allowNull:false
},
firstName:{
    type:DataTypes.STRING,
    allowNull:false
},
lastName:{
    type:DataTypes.STRING,
    allowNull:false
},
email:{
    type:DataTypes.STRING,
    unique:true,
    allowNull:false
},
password:{
    type:DataTypes.STRING,
    allowNull:false
},
profileImage:{
    type:DataTypes.STRING,
    allowNull:false,
    field:'profile_image'
},
phone:{
    type:DataTypes.STRING(16),
    allowNull:false,
    unique:true
}
})

module.exports = User